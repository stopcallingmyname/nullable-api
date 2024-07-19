import { EnvVariable } from '@app/enum/env-variable.enum';
import { MailerOptions } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { ConfigService } from '@nestjs/config';

export const getMailerConfig = async (
  configService: ConfigService,
): Promise<MailerOptions> => {
  return {
    transport: {
      host: configService.get<string>(EnvVariable.MailHost),
      port: 587,
      secure: false,
      auth: {
        user: configService.get<string>(EnvVariable.MailUser),
        pass: configService.get<string>(EnvVariable.MailPass),
      },
    },
    defaults: {
      from: '".Nullable" <no-reply@localhost>',
    },
    preview: false,
    template: {
      dir: process.cwd() + '/template/',
      adapter: new HandlebarsAdapter(), // or new PugAdapter() or new EjsAdapter()
      options: { strict: true },
    },
  };
};
