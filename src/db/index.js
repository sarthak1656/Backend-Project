import mongoose from "mongoose";
import { DBNAME } from "../constant.js";

const connectDb = async () => {
  try {
    const connectionString = `${process.env.MONGODB_URI}/${DBNAME}`;
    const connectionInstance = await mongoose.connect(connectionString);
    console.log(`mongodb connected!! DB HOST: ${connectionInstance.connection.host}`);
    
  } catch (error) {
    console.log("mongo db connection Error:", error);
    process.exit(1);
  }
};

export default connectDb;
