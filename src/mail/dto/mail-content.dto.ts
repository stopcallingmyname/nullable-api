import { IsNotEmpty, IsString } from 'class-validator';

export class MailContentDto {
  @IsString()
  @IsNotEmpty()
  name: string;
  @IsString()
  @IsNotEmpty()
  password: string;
}
