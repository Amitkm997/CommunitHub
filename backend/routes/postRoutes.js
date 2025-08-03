
import express from "express";
import { createPost, getPosts,deletePost,getAllPost } from "../controller/postController.js";
import { liked,totalLikedByUser,totalUserLikePost ,showNoOfLikes} from "../controller/likeControllser.js";
import { getJulyPost, postPerUser,totalLikedByUsers ,avgLikes,simplePost,postsWithAuthors} from "../controller/advanceController.js";

const router=express.Router();

router.post('/create',createPost)
router.get('/get/:page',getPosts)
router.get('/allPost',getAllPost)

//likes routes
router.post('/like/:postId',liked)
router.get('/like',totalLikedByUser)
router.get('/userlikes/:postId',totalUserLikePost)
router.get('/totallikes/:postId',showNoOfLikes)
router.delete('/delete/:postId',deletePost)

//advanced post
router.get('/julypost',getJulyPost)
router.get('/postPerUser',postPerUser)
router.get('/totalLikedByUser',totalLikedByUsers)
router.get('/avgLikes',avgLikes)
router.get('/simplePost',simplePost)
router.get('/postsWithAuthors',postsWithAuthors)
export default router;