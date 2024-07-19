import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { MailService } from './mail.service';
import { SendMailDto } from './dto/send-mail.dto';

@ApiTags('emails')
@Controller('mail')
export class MailController {
  constructor(private readonly mailService: MailService) {}

  @Post('send')
  async sendMail(@Body() dto: SendMailDto) {
    const isEmailSent = await this.mailService.sendMail(dto);

    if (isEmailSent) {
      return { message: 'Email sent successfully' };
    } else {
      return { message: 'Failed to sent email' };
    }
  }
}
