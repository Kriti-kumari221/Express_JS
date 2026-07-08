const mongoose=require('mongoose');
const commentSchema=new mongoose.Schema({
    user:{
        type:String,
        required:true
    },
    text:{
        type:String,
        required:true
    },
    likes:{
        type:Number,
        default:0
    },    
})
module.exports=mongoose.model("lpucommentColl",commentSchema)