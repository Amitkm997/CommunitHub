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
        let pages = req.params.page
        let limit = 5
        let skip = (pages - 1) * limit
        let posts = await Post.find({ user: req.user.userId }).sort({ createdAt: -1 })
            .skip(skip).limit(limit).sort({ createdAt: 1 })
        res.status(200).send({ message: "post fetched successfully", posts: posts })
    } catch (err) {
        res.status(500).send({ message: "Internal server error", error: err.message })
    }
}

export const deletePost = async (req, res) => {
    try {
        let postId = req.params.postId;
        await Post.findByIdAndDelete(postId);
        res.status(200).send({ message: "Post deleted successfully" })
    } catch (err) {
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


