import { ForbiddenException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import * as argon from 'argon2';
import { PrismaService } from 'src/prisma/prisma.service';
import { SigninDto, SignupDto } from './dto';

@Injectable()
export class AuthService {
  constructor(
    private prismaService: PrismaService,
    private configService: ConfigService,
    private jwtService: JwtService,
  ) {}

  async signup(dto: SignupDto) {
    const hash = await argon.hash(dto.password);

    try {
      const user = await this.prismaService.user.create({
        data: { name: dto.name ?? undefined, phone: dto.phone, hash },
      });

      delete user.hash;

      return user;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException('Credentials taken');
        }
      }
      throw error;
    }
  }

  async signin(dto: SigninDto) {
    const user = await this.prismaService.user.findUnique({
      where: { phone: dto.phone },
    });

    if (!user) {
      throw new ForbiddenException('Incorrect sign-in credentials');
    }

    const passwordMatches = await argon.verify(user.hash, dto.password);
    if (!passwordMatches) {
      throw new ForbiddenException('Incorrect sign-in credentials');
    }

    return this.signToken(user.id, user.phone);
  }

  async signToken(userId: number, phone: string) {
    const payload = {
      sub: userId,
      phone,
    };

    const secret = this.configService.get('JWT_SECRET');

    const accessToken = await this.jwtService.signAsync(payload, {
      secret,
      expiresIn: '7d',
    });

    return { accessToken };
  }
}
