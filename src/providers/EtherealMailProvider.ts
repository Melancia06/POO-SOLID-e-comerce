
import nodemailer from 'nodemailer';
import { IMailProvider } from './IMailProvider';
import { getMailClient } from '../lib/mail';
import logger from '../lib/logger';

export class EtherealMailProvider implements IMailProvider {
  async sendMail(data: {
    to: string;
    subject: string;
    text: string;
    html: string;
  }): Promise<string | false | undefined> {
    const mailer = await getMailClient();

    const info = await mailer.sendMail({
      from: '"DevStore" <noreply@devstore.com>',
      to: data.to,
      subject: data.subject,
      text: data.text,
      html: data.html
    });

    const preview = nodemailer.getTestMessageUrl(info);

    logger.info(`E-mail de teste enviado para ${data.to}`);

    return preview;
  }
}
