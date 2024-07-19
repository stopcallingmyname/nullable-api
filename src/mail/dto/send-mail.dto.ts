import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { MailContentDto } from './mail-content.dto';

export class SendMailDto {
  @IsString()
  @IsNotEmpty()
  to: string;
  @IsString()
  @IsOptional()
  subject?: string;
  @IsString()
  @IsNotEmpty()
  content: MailContentDto;
}
