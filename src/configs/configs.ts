import { config } from "dotenv";

config();

export const configs = {
  PORT: process.env.PORT || 5001,
  DB_URL: process.env.BD_URL || "sdfsdf",

  ACCESS_SECRET: process.env.JWT_ACCESS_SECRET || "sfsd",
  REFRESH_SECRET: process.env.JWT_REFRESH_SECRET || "sfsd",

  FORGOT_SECRET: process.env.JWT_FORGOT_SECRET,
  ACTIVATE_SECRET: process.env.JWT_ACTIVATE_SECRET,

  NO_REPLY_EMAIL: process.env.NO_REPLY_EMAIL,
  NO_REPLY_EMAIL_PASSWORD: process.env.NO_REPLY_EMAIL_PASSWORD,

  TWILIO_ACCOUNT_SID: process.env.TWILIO_ACCOUNT_SID,
  TWILIO_AUTH_TOKEN: process.env.TWILIO_AUTH_TOKEN,
  TWILIO_SERVICE_SID: process.env.TWILIO_SERVICE_SID,
  TWILIO_PHONE: process.env.TWILIO_PHONE,

  FRONT_URL: process.env.FRONT_URL,
};
