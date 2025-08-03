import User from "../models/userModel.js"
import Post from "../models/PostModel.js"

export const createPost=async(req,res)=>{
     const{email,title,content}=req.body;
     const user=await User.findOne({email})
     if(!user) return res.status(404).send({message:"user not found"});
     const post=await Post.create({title,content,user:user._id});  
     res.status(201).send({message:"post created successfully",post:post})
}

export const getPosts=async (req,res) => {
    const{email}=req.body;
    
    let pages=req.params.page
    let limit=5
    let skip=(pages-1)*limit
    let user=await User.findOne({email})
    //user= {
    //     _id: new ObjectId('686bd1c307193402768f03fb'),
    //     name: 'Amit',
    //     email: 'amitkm997@gmail.com',
    //     password: '12345678',
    //     __v: 0
    //   }
    let posts=await Post.find({user:user._id}).sort({createdAt:-1})
    .skip(skip).limit(limit).sort({createdAt:1})
    
    res.status(200).send({message:"post fetched successfully",posts:posts})
}

export const deletePost=async(req,res)=>{
    let postId=req.params.postId;
    await Post.findByIdAndDelete(postId);
    res.status(200).send({message:"Post deleted successfully"})
}

export const getAllPost=async(req,res)=>{
    // let allPosts=await Post.find({
    //     createdAt:{$lte:new Date('2025-07-23')}
    // })
    // console.log(new Date().toLocaleTimeString())
    let allPosts=await Post.find({title:{$exists:true}}).select('title content')
    res.send(allPosts)
}


