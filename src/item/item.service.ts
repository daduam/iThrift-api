import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateItemDto } from './dto';

@Injectable()
export class ItemService {
  constructor(private prismaService: PrismaService) {}

  async createItem(userId: number, createItemDto: CreateItemDto) {
    const item = await this.prismaService.item.create({
      data: { userId, ...createItemDto },
    });

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

  async getItems(searchQuery: string) {
    return this.prismaService.item.findMany({
      where: {
        name: {
          contains: searchQuery,
          mode: 'insensitive',
        },
      },
      include: {
        user: {
          select: {
            name: true,
          },
        },
      },
    });
  }

  async getItemById(id: number) {
    const item = await this.prismaService.item.findUnique({
      where: { id },
      include: { user: true },
    });

    if (!item) {
      throw new NotFoundException();
    }

    delete item.user.hash;

    return item;
  }
}
