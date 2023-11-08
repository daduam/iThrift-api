import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsPhoneNumber,
  IsString,
  MaxLength,
} from 'class-validator';

export class SigninDto {
  @ApiProperty({ description: 'Phone number without leading zero' })
  @MaxLength(9, { message: 'Enter valid phone number without leading zero.' })
  @IsPhoneNumber('GH')
  @IsNotEmpty()
  phone: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  password: string;
}
