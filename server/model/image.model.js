import mongoose from "mongoose";

const imageSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    prompt: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    }
},
    {
        timestamps: true
    }
)

const Image = mongoose.models.Image || mongoose.model("Image", imageSchema);

export default Image;