import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();  

const URI = process.env.MONGO_URI;  
const connectDb = async () => {
  try {
    console.log("MongoDB Connecting...")    
    const conn = await mongoose.connect(URI);
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`❌ MongoDB Connection Error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDb;
