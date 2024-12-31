import FormData from "form-data";
import User from "../model/user.model.js";
import axios from "axios";
import uploadFile from "../helpers/upload.js";
import Image from "../model/image.model.js";


// Get All Images
export const getAllImages = async (req, res) => {
    try {
        const userId = req.userId;

        const images = await Image.find({ userId })
            .sort({ createdAt: -1 });

        return res.json({
            success: true,
            images
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
}



export const generateImage = async (req, res) => {
    try {
        const userId = req.userId;
        const prompt = req.body.prompt;

        if (!prompt) {
            return res.status(400).json({ success: false, message: "Prompt is required" });
        }

        const user = await User.findById(userId);

        if (user.creditBalance <= 0) {
            return res.json({ success: false, message: "Insufficient credit balance", credits: user.creditBalance });
        }

        const formData = new FormData();
        formData.append("prompt", prompt);

        const { data } = await axios.post("https://clipdrop-api.co/text-to-image/v1", formData, {
            headers: {
                'x-api-key': process.env.CLIPDROP_API
            },
            responseType: 'arraybuffer'
        })

        const base64Image = Buffer.from(data, 'binary').toString('base64');

        // Step 3: Upload the temporary file to Cloudinary
        const imageUrl = await uploadFile(base64Image);

        const image = await Image.create({
            userId: userId,
            imageUrl: imageUrl,
            prompt: prompt
        });

        await User.findByIdAndUpdate(userId, {
            $inc: { creditBalance: -1 },
            $push: { images: image._id }
        })

        return res.status(200).json({ success: true, credits: user.creditBalance, image: imageUrl });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
}