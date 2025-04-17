import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config(); // para usar variables de .env

const connectDB = async () => {
  try {
    const mongoUri = process.env.MONGO_URI || (() => { throw new Error("MONGODB_URI is not defined"); })();
    await mongoose.connect(mongoUri);
    console.log("MongoDB Connected!!!");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1);
  }
};

export default connectDB;