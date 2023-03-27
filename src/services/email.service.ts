import nodemailer, { Transporter } from "nodemailer";

import { configs } from "../configs";

class EmailService {
  private transporter: Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: configs.NO_REPLY_EMAIL,
        pass: configs.NO_REPLY_EMAIL_PASSWORD,
      },
    });
  }

  public async sendMail(email: string) {
    return this.transporter.sendMail({
      from: "No reply",
      to: email,
      subject: "Test email",
      html: "<div>Hello from our first email</div>",
    });
  }
}

export const emailService = new EmailService();
