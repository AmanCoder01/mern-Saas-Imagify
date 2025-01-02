import express from "express";
import verifyUserToken from "../middlewares/verifyToken.js";
import { deleteImage, generateImage, getAllImages } from "../controllers/image.controller.js";


const router = express.Router();

router.post("/generate-image", verifyUserToken, generateImage);
router.get("/all", verifyUserToken, getAllImages);
router.delete("/delete/:imageId", verifyUserToken, deleteImage);

export default router
