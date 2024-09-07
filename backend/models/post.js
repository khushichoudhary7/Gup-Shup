const mongoose=require("mongoose")
const {ObjectId}=mongoose.Schema.Types
const postschema=new mongoose.Schema({
    // title:{
    //     type:String,
    //     required:true
    // },
    body:{
        type:String,
        required:true
    },
    photo:{
        type:String,
        required:true
    },
    likes:[{
type:ObjectId,
ref:"USER"
    }],
    comments:[{
        comment:{type:String },
        postedby:{type:ObjectId, ref:"USER"}

       
            }],
    postedby:{
        type:ObjectId,
        ref:"USER"
    }


})

mongoose.model("POST",postschema)