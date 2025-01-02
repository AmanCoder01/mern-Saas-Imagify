import FormData from "form-data";
import User from "../model/user.model.js";
import axios from "axios";
import Image from "../model/image.model.js";
import uploadBase64ToClodinary from "../helpers/upload.js";
import cloudinary from "../config/cloudinary.js";


// generate image and store in db and upload to clodinary
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


        // get ai image
        const formData = new FormData();
        formData.append("prompt", prompt);

        const { data } = await axios.post("https://clipdrop-api.co/text-to-image/v1", formData, {
            headers: {
                'x-api-key': process.env.CLIPDROP_API
            },
            responseType: 'arraybuffer'
        })

        const base64Image = Buffer.from(data, 'binary').toString('base64');

        const result = await uploadBase64ToClodinary(base64Image);

        const image = await Image.create({
            userId: userId,
            imageUrl: result.url,
            publicId: result.publicId,
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


// Delete image Images
export const deleteImage = async (req, res) => {
    try {
        const userId = req.userId;
        const { imageId } = req.params;

        const image = await Image.find({ _id: imageId }, { userId: userId });

        if (!image) {
            return res.status(404).json({
                success: false, message: "Image not found or You not upload this image !"
            });
        }

        //delete this image first from your cloudinary stroage
        await cloudinary.uploader.destroy(image.publicId);

        //delete this image from mongodb database
        await Image.findByIdAndDelete(imageId);

        res.status(200).json({
            success: true,
            message: "Image deleted successfully",
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

