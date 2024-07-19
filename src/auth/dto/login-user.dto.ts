import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class LoginUserDto {
  @ApiProperty({ example: 'stopcallingmyname' })
  @IsString()
  @IsNotEmpty()
  identifier: string;
  @ApiProperty({ example: 'Koffman66' })
  @IsString()
  @IsNotEmpty()
  password: string;
}
