import User from "../models/userModel.js"
import Post from "../models/PostModel.js"
export const liked = async (req, res) => {
    try {
        let postId = req.params.postId
        const post = await Post.findById(postId)
        if (!post) return res.send("post not found")

        const user = await User.findById(req.user.userId);
        let userId = req.user.userId

        post.likedBy.push(userId);
        user.likes.push(postId)

        await post.save()
        await user.save()
        res.send({ post: post, user: user })
    } catch (err) {
        res.status(500).send("internal server error")
    }
}


export const totalLikedByUser = async (req, res) => {
    try {
        let user = await User.findById(req.user.userId)
        if (!user) return res.send("user not found")

        let posts = await Promise.all(user.likes.map(async (cur) => await Post.findById(cur)))
        console.log(posts.length)
        res.status(200).send({message:"fetch tottal liked",posts:posts,likes:posts.length})
    } catch (err) {
        res.status(500).send("internal server error")
    }
}

export const totalUserLikePost = async (req, res) => {
    try{
        let postId = req.params.postId
        let post = await Post.findById(postId)
        let users = await Promise.all(post.likedBy.map(async (cur) => await User.findById(cur)))
        res.send(users)
    }catch (err) {
        res.status(500).send("internal server error")
    }
    
}

export const showNoOfLikes = async (req, res) => {
    try {
        let postId = req.params.postId

        let post = await Post.findById(postId);
        if (!post) return res.status(404).send({ message: "post not found" });

        let like = post.likedBy.length

        res.send(like)
    } catch (err) {
        console.log(err)
    }
}