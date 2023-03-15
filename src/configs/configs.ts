import { config } from "dotenv";

config();
export const configs = {
  PORT: process.env.PORT || 5100,
  DB_URL: process.env.DB_URL || "mongodb://127.0.0.1:27017/sept-2022",
};
