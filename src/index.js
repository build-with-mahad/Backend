import dotenv from "dotenv";
import mongoose from "mongoose";
import { DB_NAME } from "./constants.js";
import express from "express";
import connectDB from "./db/index.js";
const app = express()
dotenv.config({
    path: './.env'
});

// (async ()=>{
// try {
//     await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
//     app.on('error',(error)=>{
//         console.log(`Something Failed while connecting with Database!.${error}`)
//         throw error
//     })
//     app.listen(process.env.PORT,()=>{
//         console.log(`Application is running on the port ${process.env.PORT}`)
//     })

// } catch (error) {
//     console.log("MONGODB Connection Failed!.. ",error)
//     throw error;
// }
// })()
connectDB()
.then(()=>{
    app.on("error",(error)=>{
        console.log(`Application is not connected with database ${error}`)
        throw error
    })
    app.listen(process.env.PORT,()=>{
        console.log(`Appication is running on the Port NO: ${process.env.PORT}`)
    })
}).catch((error)=>{
    console.log(`MONGO-DB Connection Failed ${error}`)
    throw error
})