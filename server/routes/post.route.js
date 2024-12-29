import express from "express";
import verifyUserToken from "../middlewares/verifyToken.js";
import { createPost, getAllPosts, getMyPosts, likeDislikePosts } from "../controllers/post.controller.js";


const router = express.Router();

router.post("/create", verifyUserToken, createPost);
router.get("/like-dislike/:postId", verifyUserToken, likeDislikePosts);
router.get("/all", getAllPosts);
router.get("/my", verifyUserToken, getMyPosts);

export default router


// http://localhost:4000/api/user/register
// http://localhost:4000/api/user/login