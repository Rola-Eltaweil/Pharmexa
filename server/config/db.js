import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
const dataBaseConnection = async () => {
  try {
    const connection = await mongoose.connect(process.env.DATABASE_CONNECTION);
    console.log("connection successfully");
  } catch (error) {
    console.log(error || "database connection error");
    throw error;
  }
};

export default dataBaseConnection;
