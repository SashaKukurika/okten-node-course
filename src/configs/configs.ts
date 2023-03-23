import { config } from "dotenv";

config();

export const configs = {
  PORT: process.env.PORT || 5001,
  DB_URL: process.env.BD_URL || "sdfsdf",

  ACCESS_SECRET: process.env.JWT_ACCESS_SECRET || "sfsd",
  REFRESH_SECRET: process.env.JWT_REFRESH_SECRET || "sfsd",
};
