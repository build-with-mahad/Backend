import mongoose,{Schema} from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";
const VideoSchema = new Schema({
    videofile: {
        type: String,
        require: true
    },
    thumbnail: {
        type: String,
        require: true
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    title: {
        type: String,
        require: true
    },
    description: {
        type: String,
        require: true,
    },
    duration: {
        type: Number,
        require: true,
    },
    views: {
        type: Number,
        default: 0
    },
    isPublished: {
        type: Boolean,
        require: true
    },

}, { timestamps: true })
VideoSchema.plugin(mongooseAggregatePaginate)
export const Video = mongoose.model("Video", VideoSchema)