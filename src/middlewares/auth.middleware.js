import jwt from "jsonwebtoken"
import { ApiError } from "../utils/ApiError.js";
import { asynchandler1 } from "../utils/asynchandler.js";
import { User } from "../model/users.model.js";




const verifyJWT = asynchandler1(async (req, res,next) => {
    try {
        const token = req.cookies?.accessToken || req.header("Authorization").replace("Bearer ", "")
        if (!token) {
            throw new ApiError(401, "Unauthorized Request")
        }
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
        const user = await User.findById(decodedToken?._id).select("-password -refreshToken")

        if (!user) {
            throw new ApiError(401, "Inavild Access Token")
        }
        req.user = user;
        next()

    } catch (error) {
        throw new ApiError(401,"Invalid Access Token")
    }
})
export  {verifyJWT};