import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateItemDto } from './dto';

@Injectable()
export class ItemService {
  constructor(private prismaService: PrismaService) {}

  async createItem(userId: number, dto: CreateItemDto) {
    const item = this.prismaService.item.create({ data: { userId, ...dto } });

    return item;
  }
}
