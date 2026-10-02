import mongoose from 'mongoose'
const UserSchema = new mongoose.Schema({
    username:{
        type: String,
        require: true,
        unique : true,
        lowerCase: true
    },
    email:{
        type: String,
        require: true,
        unique : true,
    },
    fullName :{
        type: String,
        require:true,
    },
    password:{
        type:String,
        require:
        [true,
"The password must contain at least 3 different character types (e.g., uppercase letters, lowercase letters, or symbols like $)."
]
    },
    avatar:{
        type:String
    },
    CoverImage:{
        type:String
    },
    refreshToken:{
        type:String,
        require:true
    },
    watchHistory:[
        
    ]

},
    {
    timestamps:true
    }   
)
export const User = mongoose.model("User",UserSchema)