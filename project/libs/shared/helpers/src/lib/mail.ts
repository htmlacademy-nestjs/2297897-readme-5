import { ConfigService } from '@nestjs/config';
import { MailerAsyncOptions } from '@nestjs-modules/mailer/dist/interfaces/mailer-async-options.interface';
import { resolve } from 'path';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';

export function getMailerAsyncOptions(optionSpace: string): MailerAsyncOptions {
  return {
    useFactory: async (configService: ConfigService) => {
      return {
        transport: {
          host: configService.get(`${optionSpace}.host`),
          port: configService.get(`${optionSpace}.port`),
          secure: false,
          auth: {
            user: configService.get(`${optionSpace}.user`),
            password: configService.get(`${optionSpace}.user`),
          },
        },
        defaults: {
          from: configService.get('mail.from'),
        },
        template: {
          dir: resolve(__dirname, 'assets'),
          adapter: new HandlebarsAdapter(),
          options: {
            strict: true,
          }
        }
      }
    },
    inject: [ConfigService]
  }
}
