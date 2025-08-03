import mongoose from "mongoose";
const studentSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    age:{
        type:Number,
        required:true
    },
    isEnrolled:{
        type:Boolean,
        default:true
    },
    isActive:{
        type:Boolean,
        default:true
    }
},{timestamps:true})
const Student=mongoose.model("student",studentSchema);
export default Student;