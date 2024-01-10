import { Injectable } from '@nestjs/common';
import Mail from 'nodemailer/lib/mailer';
import { ConfigService } from '@nestjs/config';
import { createTransport } from 'nodemailer';

@Injectable()
export class EmailService {
  private nodemailTransporter: Mail;

  constructor(private readonly configService: ConfigService) {
    this.nodemailTransporter = createTransport({
      service: configService.get('EMAIL_SERVICE'),
      auth: {
        user: configService.get('EMAIL_USER'),
        pass: configService.get('EMAIL_PASSWORD'),
      },
    });
  }
  mailSender(options: Mail.Options) {
    return this.nodemailTransporter.sendMail(options);
  }
}
