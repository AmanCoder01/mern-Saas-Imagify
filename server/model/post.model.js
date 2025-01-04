import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    caption: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    savedBy: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        }
    ],
    likes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        }
    ],
    comments: [
        {
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
            },
            text: {
                type: String,
                required: true
            },
        }
    ]

},
    {
        timestamps: true
    }
)

const Post = mongoose.model("Post", postSchema);

export default Post;