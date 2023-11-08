import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { User } from '@prisma/client';
import { CurrentUser } from 'src/auth/decorator';
import { JwtGuard } from 'src/auth/guard';

@UseGuards(JwtGuard)
@ApiTags('users')
@Controller('users')
export class UserController {
  @Get('me')
  getMe(@CurrentUser() user: User) {
    return user;
  }
}
