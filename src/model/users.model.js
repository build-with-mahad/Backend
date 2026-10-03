import mongoose from 'mongoose'
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        require: true,
        unique: true,
        lowerCase: true
    },
    email: {
        type: String,
        require: true,
        unique: true,
    },
    fullName: {
        type: String,
        require: true,
    },
    password: {
        type: String,
        require:
            [true,
                "The password must contain at least 3 different character types (e.g., uppercase letters, lowercase letters, or symbols like $)."
            ]
    },
    avatar: {
        type: String,
        require: true
    },
    CoverImage: {
        type: String,
        require: true
    },
    refreshToken: {
        type: String,
        require: true
    },
    watchHistory: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Video"
        }
    ]

},
    {
        timestamps: true
    }
)
UserSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    this.password = bcrypt.hash(this.password, 10)
    next()
})
UserSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password)
}
UserSchema.methods.generateAccessToken = function () {
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            username: this.username,
            fullName: this.fullName
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: ACCESS_TOKEN_EXPIRY
        }
    )
}
UserSchema.methods.generateRefreshToken = function () {
    return jwt.sign(
        {
            _id: this._id,
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: REFRESH_TOKEN_EXPIRY
        }
    )
}
export const User = mongoose.model("User", UserSchema)  