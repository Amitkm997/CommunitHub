import User from "../models/userModel.js"
import Post from "../models/PostModel.js"
export const liked = async (req, res) => {
    try {
      const postId = req.params.postId;
      const userId = req.user.userId;
  
      let post = await Post.findById(postId);
      if (!post) return res.status(404).json({ message: "Post not found" });
  
      const user = await User.findById(userId);
      if (!user) return res.status(404).json({ message: "User not found" });
  
      const alreadyLiked = post.likedBy.includes(userId);
  
      if (alreadyLiked) {
        post.likedBy = post.likedBy.filter(id => id.toString() !== userId.toString());
        user.likes = user.likes.filter(id => id.toString() !== postId.toString());
      } else {
        post.likedBy.push(userId);
        user.likes.push(postId);
      }
  
      await post.save();
      await user.save();
  
      // 🔑 repopulate after saving
      post = await Post.findById(postId).populate("likedBy", "name email");
  
      res.json({
        message: alreadyLiked ? "Post unliked" : "Post liked",
        post,
        user
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Internal server error" });
    }
  };
  
  

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