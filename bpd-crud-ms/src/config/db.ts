import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connectDB = async () => {
  try {
    const mongoUri = process.env.MONGO_URI || (() => { throw new Error("MONGODB_URI is not defined"); })();
    await mongoose.connect(mongoUri);
    console.log("Connected to MongoDB successfully!!");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1);
  }
};

export default connectDB;