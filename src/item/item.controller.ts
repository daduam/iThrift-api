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
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CurrentUser } from 'src/auth/decorator';
import { JwtGuard } from 'src/auth/guard';
import { CreateItemDto, UpdateItemDto } from './dto';
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
  getItems(@Query('search') searchQuery: string) {
    return this.itemService.getItems(searchQuery);
  }

  @Get(':id')
  getItemById(@Param('id', ParseIntPipe) id: number) {
    return this.itemService.getItemById(id);
  }

  @Put(':id')
  updateItem(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateItemDto: UpdateItemDto,
    @CurrentUser('id') userId: number,
  ) {
    return this.itemService.updateItem(id, userId, updateItemDto);
  }
}
