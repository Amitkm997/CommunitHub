import { model,Schema } from "mongoose";

const postSchema=new Schema({
     title:{
        type:String,
        required:true
     },
     content:{
        type:String,
        required:true
     },
     user:{
        type:Schema.Types.ObjectId,
        ref:"user"
     },
     likedBy:[{
      type:Schema.Types.ObjectId,
      ref:'user'
     }]

},{timestamps:true});
const Post=model('post',postSchema);
export default Post;