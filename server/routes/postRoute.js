import express from "express";
import { createPost, deletePost, getAllPost, getFollowingPost, likeOrDislikePost, getUserPost } from "../controllers/postController.js";
import { isAuthorized } from "../middlewares/auth.js";

const router = express.Router();

router.post("/createpost", isAuthorized, createPost)
router.delete('/deletepost/:id', isAuthorized, deletePost)
router.put('/likepost/:id', isAuthorized, likeOrDislikePost)
router.get('/getpost/:id', isAuthorized, getUserPost)
router.get('/getallposts/:id', isAuthorized, getAllPost)
router.get('/getfollowingposts/:id', isAuthorized, getFollowingPost)

export default router