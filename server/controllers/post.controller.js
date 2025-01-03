import Post from "../model/post.model.js";
import User from "../model/user.model.js";

// Create post 
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

        await User.findByIdAndUpdate(userId, {
            $push: { posts: post._id }
        })

        return res.status(200).json({ message: "Post created successfully", post });

    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
    }
}


// Get My posts
export const getMyPosts = async (req, res) => {
    try {
        const userId = req.userId;

        const posts = await Post.find({ user: userId })
            .populate("user", "name");

        if (!posts) {
            return res.status(404).json({ message: "No posts found" });
        }

        return res.status(200).json({
            posts
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
    }
}


// Get All Posts
export const getAllPosts = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 3;
        const skip = (page - 1) * limit;

        const sortBy = req.query.sortBy || "createdAt";
        const sortOrder = req.query.sortOrder === "asc" ? 1 : -1;
        const totalPosts = await Post.countDocuments();
        const totalPages = Math.ceil(totalPosts / limit);

        const sortObj = {};
        sortObj[sortBy] = sortOrder;

        const posts = await Post.find()
            .populate("user", "name")
            .sort(sortObj)
            .skip(skip)
            .limit(limit);

        if (posts) {
            return res.status(200).json({
                success: true,
                currentPage: page,
                totalPages: totalPages,
                totalPosts: totalPosts,
                data: posts
            });
        }
    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
    }
}


// Get post by Id
export const getMyPostById = async (req, res) => {
    try {
        const { postId } = req.params;

        const post = await Post.findOne({ _id: postId })
            .populate("user", "name")
            .populate("comments.user", "name");

        if (!post) {
            return res.status(404).json({
                message: "Post not found"
            });
        }

        return res.status(200).json({
            post
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
    }
}


// Delete my Post
export const deletePostById = async (req, res) => {
    try {
        const userId = req.userId;
        const { postId } = req.params;

        const post = await Post.findByIdAndDelete(postId);

        if (!post) {
            return res.status(404).json({
                message: "Post not found"
            });
        }

        const user = await User.findByIdAndUpdate(userId, {
            $pull: { posts: postId }
        });

        return res.status(200).json({
            message: "Post deleted successfully"
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
    }
}


// Comment On posts
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


// Like and Dislike post
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