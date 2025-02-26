import nodemailer, { Transporter } from 'nodemailer';

export interface SendMailOptions {
    to: string | string[];
    subject: string;
    html: string;
    attachments?: Attachement[];
}

export interface Attachement {
    filename: string;
    path: string;
}

export class EmailService {
    private transporter: Transporter;

    constructor(mailerService: string, mailer_email: string, mailer_secret_key: string) {
        this.transporter = nodemailer.createTransport({ service: mailerService, auth: { user: mailer_email, pass: mailer_secret_key } });
    }

    async sendEmail(options: SendMailOptions): Promise<boolean> {
        const { to, subject, html, attachments = [] } = options;

        try {
            const sentInformation = await this.transporter.sendMail({ to, subject, html, attachments, });

            // console.log( sentInformation );

            return true;
        }
        catch (error) {
            return false;
        }
    }
}
