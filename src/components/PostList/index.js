import React, { useEffect , useState } from "react";

import * as api from "../../api/index";
import Post from "./Post";



export default function PostList() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchAllPosts = async () => {
            try {
                const res = await api.getAllPost();  
                setPosts(res.data);
            } catch (error) {
                console.error("Error fetching posts:", error);
            }
        };

        fetchAllPosts();
    }, []);
    return (
        <div className='grid grid-cols-2 gap-4'>
            {posts?.map((post) => (
                <Post key={post._id} post={post}  />
            ))}
        </div>
    )
}