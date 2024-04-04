import axios from "axios";

const URL = "http://localhost:5000";

export const getAllPosts = async (page, limit) => {
    try {
        const res = await axios.get(`${URL}/posts`, {
            params: { page: page, limit: limit }
        });
        return res.data;
    } catch (error) {
        throw new Error(error.message);
    }
};

export const createPost = async (data) => {
    const res = await axios.post(`${URL}/posts`, data)
    return res
}

export const updatePost = async (id, data) => {
    const res = await axios.put(`${URL}/posts/update/${id}`, data)
    return res
}

export const deletePost = async (id) => {
    const res = await axios.delete(`${URL}/posts/delete/${id}`)
    return res
}
