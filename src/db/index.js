import mongoose from "mongoose";
import { DBNAME } from "../constant.js";

const connectDb = async () => {
  try {
    const connectionInstance=  await mongoose.connect(`${process.env.MONGODB_URI}/${DBNAME}`)
    console.log(`\n mongodb connected!! DB HOST: ${connectionInstance.connection.host}`);
    
  } catch (error) {
    console.log("mongo db connection Error:", error); // Corrected typo in "Error"
    process.exit(1)
  }
};

export default connectDb;
