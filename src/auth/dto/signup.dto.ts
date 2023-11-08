import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsString,
  MaxLength,
} from 'class-validator';
import { Match } from '../decorator';

export class SignupDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsNotEmpty()
  name?: string;

  @ApiProperty({ description: 'Phone number without leading zero' })
  @MaxLength(9, { message: 'Enter valid phone number without leading zero.' })
  @IsPhoneNumber('GH')
  @IsNotEmpty()
  phone: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  password: string;

  @IsString()
  @IsNotEmpty()
  @Match('password')
  @ApiProperty()
  confirmPassword: string;
}
