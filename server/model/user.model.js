import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    creditBalance: {
        type: Number,
        default: 5
    },
    generatedImages: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Images"
        }
    ],
    posts: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Post'
        }
    ],
    saved: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Post'
        }
    ],
    resetPasswordToken: String,
    resetPasswordExpiresAt: Date,
},
    {
        timestamps: true
    }
)

const User = mongoose.model("User", userSchema);

export default User;