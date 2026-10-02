import mongoose from "mongoose"
import dotenv from "dotenv";
import { DB_NAME } from "../constants.js";
dotenv.config({
    path:"./.env"
})

const connectDB = async () =>{
    try {
        const connections = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        console.log(`Mongo DB Connected Successfully !. ${connections.connection.host}`)
    } catch (error) {
        console.log(`Connection Failed Due to Some Error Issues. ${error}`)
        process.exit(1)
    }
}
export  default connectDB