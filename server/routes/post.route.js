import express from "express";
import verifyUserToken from "../middlewares/verifyToken.js";
import { commentOnPost, createPost, getAllPosts, getMyPostById, getMyPosts, likeDislikePosts } from "../controllers/post.controller.js";


const router = express.Router();

router.post("/create", verifyUserToken, createPost);
router.get("/like-dislike/:postId", verifyUserToken, likeDislikePosts);
router.post("/comment/:postId", verifyUserToken, commentOnPost);
router.get("/all", getAllPosts);
router.get("/:postId", getMyPostById);
router.get("/my", verifyUserToken, getMyPosts);

export default router


// http://localhost:4000/api/user/register
// http://localhost:4000/api/user/login