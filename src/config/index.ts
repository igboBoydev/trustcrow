import * as dotenv from "dotenv";

if (process.env.NODE_ENV !== "production") {
  dotenv.config();
}
export const PORT = process.env.PORT || "";
export const ENVIRONMENT = process.env.NODE_ENV || "";
export const SECRET = process.env.SECRET || "";
export const REDIS_URL = process.env.REDIS_URL || "";
export const DATABASE_URL = process.env.DATABASE_URL || "";
