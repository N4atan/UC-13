// src/config/env.ts
import dotenv from "dotenv";

dotenv.config();

export const env = {
  DB_HOST: process.env.DB_HOST || "localhost",
  DB_USER: process.env.DB_USER || "root",
  DB_PASSWORD: process.env.DB_PASSWORD || "root",
  DB_NAME: process.env.DB_NAME || "241nuc13",
  DB_PORT: Number(process.env.DB_PORT) || 3306,
};