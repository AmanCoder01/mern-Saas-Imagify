import express from "express";
import verifyUserToken from "../middlewares/verifyToken.js";
import { commentOnPost, createPost, deletePostById, getAllPosts, getMyPostById, getMyPosts, likeDislikePosts, savedPost, saveUnsavePostById } from "../controllers/post.controller.js";


const router = express.Router();

router.get("/get-saved", verifyUserToken, savedPost);
router.post("/create", verifyUserToken, createPost);
router.post("/comment/:postId", verifyUserToken, commentOnPost);
router.get("/my", verifyUserToken, getMyPosts);
router.get("/all", getAllPosts);
router.get("/:postId", getMyPostById);
router.get("/save-unsave/:postId", verifyUserToken, saveUnsavePostById);
router.get("/like-dislike/:postId", verifyUserToken, likeDislikePosts);
router.delete("/:postId", verifyUserToken, deletePostById);

export default router;