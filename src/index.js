
import connectDb from "./db/index.js";
import dotenv from "dotenv"


dotenv.config({
  path:"./env"
})

connectDb()


// import { DBNAME } from "./constant";
// import mongoose from "mongoose";


// require('dotenv').config()












// import express from "express";
// const app = express()
// (async () => {
//   try {
//     await mongoose.connect(`${process.env.MONGODB_URI}/videotube`);
//     app.on("error", (error) => {
//       console.log("err: ", error);
//       throw error;
//     });
//     app.listen(process.env.PORT,()=>{
//         console.log(`App is listening on port ${process.env.PORT}`);
        
//     })
//   } catch (error) {
//     console.error("Error: ", error);
//     throw error;
//   }
// })();
