import cloudinary from "../config/cloudinary";

const uploadBase64ToClodinary = async (base64Image) => {
    try {
        const result = await cloudinary.uploader.upload(`data:image/png;base64,${base64Image}`, {
            resource_type: "image", // Specify the resource type as image
        });

        return {
            url: result.secure_url,
            publicId: result.public_id,
        };
    } catch (error) {
        console.log(error.message);
    }

}



const uploadToClodinary = async (filePath) => {
    try {
        const result = await cloudinary.uploader.upload(filePath);

        return {
            url: result.secure_url,
            publicId: result.public_id,
        };
    } catch (error) {
        console.error("Error while uploading to cloudinary", error);
        throw new Error("Error while uploading to cloudinary");
    }
}

export default uploadBase64ToClodinary