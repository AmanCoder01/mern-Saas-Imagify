import jwt from "jsonwebtoken";
import User from "../model/user.model.js"
import bcrypt from "bcrypt";
import razorpay from "razorpay"
import Transaction from "../model/transaction.model.js";
import { sendPasswordResetEmail, sendResetSuccessEmail } from "../mailsender/email.js";
import crypto from "crypto"

export const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ success: false, message: "Please fill in all fields" });
        }

        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ success: false, message: "Email already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        user = await User.create({
            name,
            email,
            password: hashedPassword
        })

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "10m" });

        return res.status(201).json({
            success: true,
            message: "User created successfully",
            token: token,
            user: {
                name: user.name,
                email: user.email,
                credits: user.creditBalance
            }
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
}


export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ success: false, message: "Please fill in all fields" });
        }

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ success: false, message: "Email not found" });
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password);

        if (!isPasswordMatch) {
            return res.status(400).json({ success: false, message: "Invalid password" });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "10m" });

        return res.status(201).json({
            success: true,
            message: "User logged in successfully",
            token: token,
            user: {
                name: user.name,
                email: user.email,
                credits: user.creditBalance
            }
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
}


//get user details
export const userProfile = async (req, res) => {
    try {
        const userId = req.userId;


        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({
                success: false, message: "User not found"
            });
        }

        return res.status(201).json({
            success: true,
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                credits: user.creditBalance
            }
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
}





//send reset password link to user email
export const sendResetPassword = async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.json({
                success: false,
                message: "Enter email"
            })
        }


        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({
                success: false, message: "User not found"
            });
        }

        const resetToken = crypto.randomBytes(20).toString("hex");
        const resetTokenExpiresAt = Date.now() + 30 * 60 * 1000; // 30 min

        user.resetPasswordToken = resetToken;
        user.resetPasswordExpiresAt = resetTokenExpiresAt;

        await user.save();

        await sendPasswordResetEmail(email, `https://imagify-ai-sigma.vercel.app/verify-email/${resetToken}`);

        return res.json({
            success: true,
            message: "Password reset link sent to your email"
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
}






// reset password
export const updatePassword = async (req, res) => {
    try {
        const { resetToken } = req.params;
        const { password } = req.body;


        if (!password || !resetToken) {
            return res.json({
                success: false,
                message: "Enter blank fields !"
            });
        }


        const user = await User.findOne({
            resetPasswordToken: resetToken,
            resetPasswordExpiresAt: { $gt: Date.now() },
        });

        if (!user) {
            return res.json({ success: false, message: "Invalid or expired reset token" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        user.password = hashedPassword;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpiresAt = undefined;
        await user.save();


        await sendResetSuccessEmail(user.email);

        return res.json({ success: true, message: "Password reset successful" });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
}








const razorpayInstance = new razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
})



export const paymentRazorPay = async (req, res) => {
    try {
        const userId = req.userId;
        const { planId } = req.body;

        if (!planId) {
            return res.json({
                success: false,
                message: "Plan id is required"
            });
        }

        const user = await User.findById(userId);

        if (!user) {
            return res.json({ success: false, message: "User not found" });
        }

        let credits, plan, amount;

        switch (planId) {
            case 'Basic':
                plan = 'Basic';
                credits = 100;
                amount = 10;
                break;

            case 'Advanced':
                plan = 'Advanced';
                credits = 500;
                amount = 50;
                break;

            case 'Business':
                plan = 'Business';
                credits = 5000;
                amount = 250;
                break;

            default:
                return res.json({ success: false, message: "Invalid plan id" });
        }

        const transaction = await Transaction.create({
            userId,
            plan,
            credits,
            amount
        });

        const options = {
            amount: amount * 100,
            currency: process.env.CURRENCY,
            receipt: transaction._id
        }

        await razorpayInstance.orders.create(options, (error, order) => {
            if (error) {
                return res.json({ success: false, message: error });
            }
            return res.json({ success: true, order });
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
}


export const verifyPayment = async (req, res) => {
    try {
        const { razorpay_order_id } = req.body;

        const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id);

        if (orderInfo.status === "paid") {
            const transaction = await Transaction.findById(orderInfo.receipt);

            if (transaction.payment) {
                return res.json({ success: false, message: "Payment Failed!" });
            }

            const user = await User.findById(transaction.userId);

            const creditBalance = user.creditBalance + transaction.credits;
            user.creditBalance = creditBalance;
            await user.save();

            await Transaction.findByIdAndUpdate(transaction._id, {
                payment: true
            })
            return res.json({ success: true, message: "Credits Added!" });
        } else {
            return res.json({ success: false, message: "Payment Failed!" });
        }

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
}