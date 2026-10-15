import { asynchandler1 } from "../utils/asynchandler.js";
import { ApiError } from "../utils/ApiError.js"
import { User } from "../model/users.model.js";
import { uploadonCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import cookieParser from "cookie-parser";

const generateAccessTokenRefreshToken = async (userId) => {
    try {
        const user = await User.findById(userId)
        const accessToken = await user.generateAccessToken()
        const refreshToken = await user.generateRefreshToken()

        user.refreshToken = refreshToken
        await user.save({ validateBeforeSave: false })
        return { accessToken, refreshToken }
    } catch (error) {
        throw new ApiError(500, "Something Went Wrong While generating Tokens!.. ")
    }
}

const registeruser = asynchandler1(async (req, res) => {
    // get infromation and details from frontend
    const { fullName, username, email, password } = req.body;

    // check validity
    if ([fullName, username, email, password].some((field) => field?.trim() === "")) {
        throw new ApiError(400, "All fields are required!...")
    }

    // check if user is already exist with same username and email
    const existedUser = await User.findOne({
        $or: [{ username }, { email }]
    })
    if (existedUser) {
        throw new ApiError(400, "User is Already exist with this username or email!.")
    }

    // check images of avatar and coverimage
    const avatarlocalfilepath = req.files?.avatar[0]?.path
    // const coverImagelocalfilepath = req.files?.CoverImage[0]?.path
    let coverImagelocalfilepath;
    if (req.files && Array.isArray(req.files.CoverImage) && req.files.CoverImage.length > 0) {
        coverImagelocalfilepath = req.files.CoverImage[0].path
    }

    if (!avatarlocalfilepath) {
        throw new ApiError(402, "Avatar file is required")
    }
    // check upload on cloudinary 
    const avatar = await uploadonCloudinary(avatarlocalfilepath)
    const CoverImage = await uploadonCloudinary(coverImagelocalfilepath)

    if (!avatar) {
        throw new ApiError(401, "Avatar Image is required!.")
    }

    //create db entry
    const user = await User.create({
        fullName,
        avatar: avatar.url,
        CoverImage: CoverImage?.url || "",
        username: username.toLowerCase(),
        email,
        password
    })

    // hide password and refresh token from field response
    const createdUser = await User.findById(user._id).select(" -password -refreshToken ")

    // check user is created
    if (!createdUser) {
        throw new ApiError(400, "Something Went Wrong")
    }
    return res.status(200).json(
        new ApiResponse(201, createdUser, "User Registered Successfully")
    )
})

const LoginUser = asynchandler1(async (req, res) => {
    // get details
    // check user is already exist or not
    // check password
    // generate accesstoken and refreshtoken
    // send cookie 

    const { email, username, password } = req.body;
    if (!email && !username) {
        throw new ApiError(401, "Username or Email is required")
    }
    const user = await User.findOne({
        $or: [{ username }, { email }]
    })
    if (!user) {
        throw new ApiError(400, "User Doesn't Exist")
    }
    const isPasswordValid = await user.isPasswordCorrect(password)
    if (!isPasswordValid) {
        throw new ApiError(400, "Password is incorrect . Please Try again")
    }
    const { accessToken, refreshToken } = await generateAccessTokenRefreshToken(user._id)
    const options = {
        httpOnly: true,
        secure: true
    }
    return res.status(202)
        .cookie("accessToken", accessToken, options)
        .cookie("RefreshToken", refreshToken, options)
        .json(
            new ApiResponse(200,
                {
                    user: LoginUser, accessToken, refreshToken
                },
                "User LoggedIn Successfully"
            )
        )
})

export { registeruser, LoginUser }