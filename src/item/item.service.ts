import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateItemDto } from './dto';

@Injectable()
export class ItemService {
  constructor(private prismaService: PrismaService) {}

  async createItem(userId: number, dto: CreateItemDto) {
    const item = this.prismaService.item.create({ data: { userId, ...dto } });

    return item;
  }

  async deleteItemById(userId: number, itemId: number) {
    const item = await this.prismaService.item.findUnique({
      where: {
        id: itemId,
      },
    });

    if (!item || item.userId !== userId)
      throw new ForbiddenException('Access denied');

    await this.prismaService.item.delete({
      where: {
        id: itemId,
      },
    });
  }
}
