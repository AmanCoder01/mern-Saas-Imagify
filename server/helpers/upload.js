import { v2 as cloudinary } from "cloudinary";


cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const uploadFile = async (base64Image) => {

    try {
        const result = await cloudinary.uploader.upload(`data:image/png;base64,${base64Image}`, {
            resource_type: "image", // Specify the resource type
        });
        console.log("Uploaded to Cloudinary:", result);
        return result.secure_url;
    } catch (error) {
        console.log(error.message);
    }

}

export default uploadFile