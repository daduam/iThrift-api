import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsUrl } from 'class-validator';

export class UpdateItemDto {
  @ApiProperty()
  @IsOptional()
  name?: string;

  @ApiProperty()
  @IsOptional()
  description?: string;

  @ApiProperty()
  @IsOptional()
  price?: string;

  @ApiProperty()
  @IsUrl()
  @IsOptional()
  imageUrl?: string;
}
