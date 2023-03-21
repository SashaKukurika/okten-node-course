import { config } from "dotenv";

config();
export const configs = {
  PORT: process.env.PORT || 5100,
  DB_URL:
    process.env.DB_URL ||
    "mongodb+srv://Gydini13:wJ3K9NEcujJUzvF6@cluster0.bv613y9.mongodb.net/?retryWrites=true&w=majority",
};
