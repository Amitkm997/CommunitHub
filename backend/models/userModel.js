import mongoose from "mongoose";
const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    likes:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"post"
    }],
    password:{
        type:String,
        required:true
    }
})

const User=mongoose.model('user',userSchema);
export default User;