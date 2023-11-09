import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CurrentUser } from 'src/auth/decorator';
import { JwtGuard } from 'src/auth/guard';
import { CreateItemDto } from './dto';
import { ItemService } from './item.service';

@UseGuards(JwtGuard)
@ApiTags('items')
@Controller('items')
export class ItemController {
  constructor(private readonly itemService: ItemService) {}

  @Post()
  createItem(
    @CurrentUser('id') userId: number,
    @Body() createItemDto: CreateItemDto,
  ) {
    return this.itemService.createItem(userId, createItemDto);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  deleteItemById(
    @CurrentUser('id') userId: number,
    @Param('id', ParseIntPipe) itemId: number,
  ) {
    return this.itemService.deleteItemById(userId, itemId);
  }

  @Get()
  getItems() {
    return this.itemService.getItems();
  }

  @Get(':id')
  getItemById(@Param('id', ParseIntPipe) id: number) {
    return this.itemService.getItemById(id);
  }
}
