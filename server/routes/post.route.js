import express from "express";
import verifyUserToken from "../middlewares/verifyToken.js";
import { commentOnPost, createPost, deletePostById, getAllPosts, getMyPostById, getMyPosts, likeDislikePosts } from "../controllers/post.controller.js";


const router = express.Router();

router.post("/create", verifyUserToken, createPost);
router.get("/my", verifyUserToken, getMyPosts);
router.get("/all", getAllPosts);
router.get("/:postId", getMyPostById);
router.delete("/postId", verifyUserToken, deletePostById);
router.get("/like-dislike/:postId", verifyUserToken, likeDislikePosts);
router.post("/comment/:postId", verifyUserToken, commentOnPost);

export default router;