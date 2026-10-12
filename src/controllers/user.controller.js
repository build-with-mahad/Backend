import { asynchandler1 } from "../utils/asynchandler.js";
import {ApiError} from "../utils/ApiError.js"
import { User } from "../model/users.model.js";
import { uploadonCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";
const registeruser = asynchandler1(async (req, res) => {
    // get infromation and details from frontend
    const { fullName, username, email, password } = req.body;
    console.log("email",email)
    // check validity
    if([fullName,username,email,password].some((field)=>field?.trim()==="")){
        throw new ApiError(400,"All fields are required!...")
    }
    // check if user is already exist with same username and email
    const existedUser =await User.findOne({
        $or: [{username},{email}]
    })
    if(existedUser){
        throw new ApiError(400,"User is Already exist with this username and email!.")
    }
    // check images of avatar and coverimage
    const avatarlocalfilepath = req.files?.avatar[0]?.path
    const coverImagelocalfilepath = req.files?.CoverImage[0]?.path
    if(!avatarlocalfilepath){
        throw new ApiError(402,"Avatar file is required")
    }
    // check upload on cloudinary 
    const avatar = await uploadonCloudinary(avatarlocalfilepath)
    const coverImage = await uploadonCloudinary(coverImagelocalfilepath)

    if(!avatar){
        throw new ApiError(401,"Avatar Image is required!.")
    }
    //create db entry
     const user = await User.create({
    fullName,
    avatar: avatar.url,
    CoverImage:coverImage?.url || "",
    username:username.lowerCase(),
    email,
    password
    })
    // hide password and refresh token from field response
 const createdUser = await User.findById(user._id).select("-password -refreshToken")
    // check user is created
    if(!createdUser) {
        throw new ApiError(400,"Something Went Wrong")
    }
    // return response
    return res.status(200).json(
        new ApiResponse(201,createdUser,"User Registered Successfully")
    )
})

export { registeruser }