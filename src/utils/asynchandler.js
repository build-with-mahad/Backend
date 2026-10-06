// const asynchandler = (fn) = async(req,res,next) =>{
//     try {
//         await fn (req,res,next)
//     } catch (error) {
//         res.status(err.code || 5000).json({
//             success:false,
//             message:"Something Went Wrong"
//         })
//     }
// }
 const asynchandler1 = (requesthandler) => {
    return (req,res,next)=>{
        Promise.resolve(requesthandler(req,res,next)).catch((err)=>next(err))
    }
 }
export  {asynchandler1};

















