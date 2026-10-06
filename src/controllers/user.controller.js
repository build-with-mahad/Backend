import { asynchandler1 } from "../utils/asynchandler.js";
const registerUser =  asynchandler1(async(req,res)=>{
    res.status(202).json({
        message:"Kindly Register Yourself First.."
    })
})
const login = asynchandler1(async(req,res)=>{
    res.status(202).json({
        message:"LoggedIn Succesfull!. "
    })
})
export {registerUser,login}