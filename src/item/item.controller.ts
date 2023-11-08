import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CurrentUser } from 'src/auth/decorator';
import { JwtGuard } from 'src/auth/guard';
import { CreateItemDto } from './dto';
import { ItemService } from './item.service';

@UseGuards(JwtGuard)
@ApiTags('items')
@Controller('items')
export class ItemController {
  constructor(private itemService: ItemService) {}

  @Post()
  createItem(@CurrentUser('id') userId: number, @Body() dto: CreateItemDto) {
    return this.itemService.createItem(userId, dto);
  }
}
