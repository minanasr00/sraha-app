import mongoose from "mongoose";
import { UserModel } from "./index.js";
import { DB_uri } from "../../config/config.service.js";

export default async function authenticateDB() {
  try {
    await mongoose.connect(DB_uri);
    console.log("Connected successfully to DB 🟢");

    await UserModel.syncIndexes();
  } catch (error) {
    console.error("DB error ❌ : ", error.message);
  }
}
