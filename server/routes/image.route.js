import express from "express";
import verifyUserToken from "../middlewares/verifyToken.js";
import { generateImage, getAllImages } from "../controllers/image.controller.js";


const router = express.Router();

router.post("/generate-image", verifyUserToken, generateImage);
router.get("/all", verifyUserToken, getAllImages);



export default router


// http://localhost:4000/api/user/register
// http://localhost:4000/api/user/login