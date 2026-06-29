import mongoose from "mongoose";
import { config } from "./env.config.js";

export const connectDB = async () => {
  try {
    await mongoose.connect(config.mongoUrl);
    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection error:", error.message);
    process.exit(1);
  }
};