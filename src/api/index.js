import axios from "axios";

const URL = "http://localhost:5000";

export const getAllPost = async () => {
    const res = await axios.get(`${URL}/posts`)
    return res
}

export const createPost = async (data) => {
    const res = await axios.post(`${URL}/posts`, data)
    return res
}

export const updatePost = async (id, data) => {
    const res = await axios.put(`${URL}/posts/update/${id}`, data)
    return res
}

