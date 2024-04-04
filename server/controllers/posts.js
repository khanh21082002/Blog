import { PostModel } from "../models/PostModel.js";

export const getPosts = async (req, res) => {
    const page = parseInt(req.query.page) || 1; // Lấy trang từ yêu cầu, mặc định là trang 1
    const limit = parseInt(req.query.limit) || 6;

    const startIndex = (page - 1) * limit;

    try {
        const totalPosts = await PostModel.countDocuments({});
        const totalPages = Math.ceil(totalPosts / limit); // Tính tổng số trang
        const posts = await PostModel.find().skip(startIndex).limit(limit);

        const pagination = {};
        if (page < totalPages) {
            pagination.next = {
                page: page + 1,
                limit: limit
            };
        }

        if (page > 1) {
            pagination.prev = {
                page: page - 1,
                limit: limit
            };
        }

        res.status(200).json({ posts: posts, totalPages: totalPages, pagination: pagination });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const createPosts = async (req, res) => {
    try {
        const newPost = req.body
        const post = new PostModel(newPost)
        await post.save()
        res.status(200).json(post)
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

export const updatePosts = async (req, res) => {
    try {
        const updatedPost = req.body;
        const post = await PostModel.findByIdAndUpdate(
            req.params.id,
            updatedPost,
            { new: true }
        )
        res.json(post)
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

export const deletePosts = async (req, res) => {
    try {
        const deletePost = req.body;
        const post = await PostModel.findByIdAndDelete({ _id: req.params.id })
        res.status(200).json({ message: "Delete successfully" })
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}
