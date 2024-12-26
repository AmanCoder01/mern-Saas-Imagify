import express from "express";
import { loginUser, paymentRazorPay, registerUser, sendResetPassword, updatePassword, userProfile, verifyPayment } from "../controllers/user.controller.js";
import verifyUserToken from "../middlewares/verifyToken.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/send-reset", sendResetPassword);
router.post("/verify-email/:resetToken", updatePassword);
router.get("/profile", verifyUserToken, userProfile);
router.post("/pay", verifyUserToken, paymentRazorPay);
router.post("/verify-pay", verifyPayment);


export default router


// http://localhost:4000/api/user/register
// http://localhost:4000/api/user/login