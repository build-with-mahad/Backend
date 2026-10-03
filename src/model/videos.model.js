import mongoose from "mongoose";
const VideoSchema = new mongoose.Schema({
videofile:{
    type:String,
    require:true
},
thumbnail:{
    type:String,
    require:true
},
owner:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User"
},
title:{
    type:String,
    require:true
},
description:{
    type:String,
    require:true,
},
duration:{
    type:Number,
    require:true,
},
views:{
    type:Number,
    default:0
},
isPublished:{
    type:Boolean,
    require:true
},

},{timestamps:true})
export const Video = mongoose.model("Video",VideoSchema)