import mongoose from "mongoose";
import { config } from "../configs/index.js";

const MONGO_URL = config.DATABASE_URL;

const connect = async function () {
  try {
    mongoose.set("strictQuery", false);
    await mongoose.connect(MONGO_URL);
    console.log("Connected to DB");
  } catch (err) {
    console.error(err);
  }
};

export default connect;
