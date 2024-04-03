import React, { useEffect, useState } from "react";

import * as api from "../../api/index";
import { Pagination } from "antd";

import Post from "./Post";



export default function PostList() {
    const [posts, setPosts] = useState([]);
    const [page, setPage] = useState(2);
    const [totalPages, setTotalPages] = useState(0);
    const limit = 6;
    

    useEffect(() => {
        const fetchAllPosts = async () => {
            try {
                const res = await api.getAllPosts(page, limit);
                setPosts(res.posts);
                setTotalPages(res.totalPages);
            } catch (error) {
                console.error("Error fetching posts:", error);
            }
        };

        fetchAllPosts();
    }, [page, limit , totalPages]);

    console.log(totalPages)
    return (
        <>
            <div className='grid grid-cols-2 gap-4'>
                {posts?.map((post) => (
                    <Post key={post._id} post={post} />
                ))}
            </div>

            <div className='flex justify-center my-10'>
                <Pagination current={page} onChange={(page) => setPage(page)} total={totalPages} />
            </div>
        </>
    )
}