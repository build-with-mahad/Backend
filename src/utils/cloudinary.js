import { v2 as cloudinary } from "cloudinary"
import dotenv from "dotenv"
import fs from "fs"
dotenv.config({
    path: "./.env"
})
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

const uploadonCloudinary = async (localfilepath) => {
    try {
        if (!localfilepath) return null;
        const response = await cloudinary.uploader.upload(localfilepath, { resource_type: "auto" });
        //file upload on cloudinary successfully
        console.log("File is uploaded on cloudinary : ", response.url)
        // delete the file on local server
        fs.unlinkSync(localfilepath)
        return response;
    } catch (error) {
        fs.unlinkSync(localfilepath)
        return null
    }
}
export  {uploadonCloudinary}