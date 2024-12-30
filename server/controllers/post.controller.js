import Post from "../model/post.model.js";
import User from "../model/user.model.js";


export const createPost = async (req, res) => {
    try {
        const { caption, content } = req.body;
        const userId = req.userId;

        if (!content) {
            return res.status(400).json({ message: "Content is required" });
        }

        const post = await Post.create({
            caption,
            content,
            user: userId
        })
        // push post id to user model in posts array

        const user = await User.findByIdAndUpdate(userId, {
            $push: { posts: post._id }
        })

        return res.status(200).json({ message: "Post created successfully", post });

    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
    }
}

export const getAllPosts = async (req, res) => {
    try {

        // sort creted at -1
        const posts = await Post.find()
            .populate("user", "name")
            .sort({ createdAt: -1 })


        return res.status(200).json({
            posts
        });

    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
    }
}

export const getMyPosts = async (req, res) => {
    try {

        const userId = req.userId;

        const posts = await Post.find({ user: userId })
            .populate("user", "name");

        return res.status(200).json({
            posts
        });

    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
    }
}


export const commentOnPost = async (req, res) => {
    try {

        const { postId } = req.params;
        const userId = req.userId;
        const { text } = req.body;

        if (!text) {
            return res.status(400).json({
                message: "Please enter a comment"
            })
        }

        const posts = await Post.findOne({ _id: postId });

        if (!posts) {
            return res.status(404).json({
                message: "Post not found"
            });
        }

        posts.comments.push({
            user: userId,
            text
        })

        await posts.save();

        const post = await Post.findOne({ _id: postId })
            .populate("comments.user", "name");

        return res.status(200).json({
            message: "Comment done",
            post
        });

    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
    }
}


export const getMyPostById = async (req, res) => {
    try {

        const { postId } = req.params;

        const post = await Post.findOne({ _id: postId })
            .populate("user", "name")
            .populate("comments.user", "name");

        return res.status(200).json({
            post
        });

    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
    }
}



export const likeDislikePosts = async (req, res) => {
    try {

        const userId = req.userId;
        const { postId } = req.params;

        const posts = await Post.findById(postId);

        if (!posts) {
            return res.status(404).json({
                message: "Post not found"
            });
        }


        if (posts.likes.includes(userId.toString())) {
            posts.likes.pull(userId.toString());

            await posts.save();

            return res.status(200).json({
                message: "Post unliked",
                likes: posts.likes.length,
            });
        } else {
            posts.likes.push(userId.toString());

            await posts.save();

            return res.status(200).json({
                message: "Post liked",
                likes: posts.likes.length,
            });
        }



    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
    }
}