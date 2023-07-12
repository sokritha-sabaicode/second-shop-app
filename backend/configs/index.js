import { fileURLToPath } from "url";
import * as dotenv from "dotenv";
import { dirname, resolve } from "path";

// Resolve the directory path of the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

if (process.env.NODE_ENV !== "production") {
  dotenv.config({ path: resolve(__dirname, ".env.dev") });
} else {
  dotenv.config({ path: resolve(__dirname, ".env.prod") });
}

export const config = {
  DATABASE_URL: `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cambosecondshop.tymtlgl.mongodb.net/?retryWrites=true&w=majority`,
  PORT: process.env.PORT || 6000,
  PINECONE_API_KEY: process.env.PINECONE_API_KEY,
  PINECONE_ENVIRONMENT: process.env.PINECONE_ENVIRONMENT,
  OPENAI_API_KEY: process.env.OPENAI_API_KEY,
  CLOUDINARY_NAME: process.env.CLOUDINARY_NAME,
  CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET,
};
