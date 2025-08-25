import User from "../models/userModel.js"
import Post from "../models/PostModel.js"

export const createPost = async (req, res) => {
    console.log(req.user)
    try {
        const { title, content } = req.body
        const post = await Post.create({ title, content, user: req.user.userId });
        res.status(201).send({ message: "post created successfully", post: post })
    } catch (err) {
        res.status(500).send({ message: "Internal server error", error: err.message })
    }
}

export const getPosts = async (req, res) => {
    try {
      let page = parseInt(req.params.page) || 1; // default to 1
      let limit = 5;
      let skip = (page - 1) * limit;
  
      let posts = await Post.find({ user: req.user.userId })
        .sort({ createdAt: -1 }) // newest first
        .skip(skip)
        .limit(limit);
  
      // count total posts for pagination info
      let totalPosts = await Post.countDocuments({ user: req.user.userId });
      let totalPages = Math.ceil(totalPosts / limit);
  
      res.status(200).send({
        message: "Posts fetched successfully",
        posts,
        pagination: {
          currentPage: page,
          totalPages,
          totalPosts,
        },
      });
    } catch (err) {
      res.status(500).send({ message: "Internal server error", error: err.message });
    }
  };
  

export const deletePost = async (req, res) => {
    try {
        let postId = req.params.postId;
        await Post.findByIdAndDelete(postId);
        res.status(200).send({ message: "Post deleted successfully" })
    } catch (err) {
        res.status(500).send({ message: "Internal server error", error: err.message })
    }
}

export const updatePost=async(req,res)=>{
    try{
        let postId=req.params.postId;
        const{content,title}=req.body;
        // let post=await Post.findById(postId);
        // if(!post) return req.status(404).send({message:"post not found"})
        // post.title=title;
        // post.content=content;
        // post.save()
        let post=await Post.findByIdAndUpdate(postId,{content,title},{new:true})
        console.log(post)
        res.status(200).send({message:"post updated successfully",post:post})    
    }catch(err){
        res.status(500).send({ message: "Internal server error", error: err.message })
    }
   
}

export const getAllPost = async (req, res) => {
    // let allPosts=await Post.find({
    //     createdAt:{$lte:new Date('2025-07-23')}
    // })
    // console.log(new Date().toLocaleTimeString())
    try {
        let allPosts = await Post.find({ title: { $exists: true } }).select('title content')
        res.send(allPosts)
    } catch (err) {
        res.status(500).send({ message: "Internal server error", error: err.message })
    }

}


