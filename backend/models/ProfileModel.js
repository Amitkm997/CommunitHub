
import mongoose from "mongoose";

const profileSchema=new mongoose.Schema({
    bio:{
        type:String,
        required:true
    },
    age:{
        type:Number,
        required:true
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    }
},{timestamps:true});

const Profile=mongoose.model('profile',profileSchema);
export default Profile;