import React, { useEffect, useState } from "react";
import { Card, Avatar } from 'antd';
import moment from 'moment'
import * as api from '../../../api/index';
import { useMutationHooks } from '../../../hooks/useMutation';

import { UserOutlined, LikeFilled, SettingOutlined, EditOutlined, EllipsisOutlined } from '@ant-design/icons';
import UpdatePost from "./UpdatePost";

export default function Post({ post }) {

    const [like, setLike] = useState(post.likeCount);
    const [isLiked, setIsLiked] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [updatePost, setUpdatePost] = useState(post);
   
   const mutation = useMutationHooks(
       (data) => api.updatePost( post._id , data,),
       {
           onSuccess: (data) => {
               // Cập nhật trạng thái like sau khi mutation thành công
               setLike(data.likeCount);
           }
       }
   );



    const handleLike = async () => {
        const updatedLikeCount = isLiked ? like - 1 : like + 1;
        setLike(updatedLikeCount); // Cập nhật trạng thái like ngay lập tức
        setIsLiked(!isLiked);
        mutation.mutate({ likeCount: updatedLikeCount }); // Gọi API cập nhật likeCount

        const likedPosts = JSON.parse(localStorage.getItem('likedPosts')) || {};
        likedPosts[post._id] = !isLiked;
        localStorage.setItem('likedPosts', JSON.stringify(likedPosts));
    }
    const handleModal = () => {
        setModalOpen(true);
    }

    const handleUpdatePost = (newPost) => {
        setModalOpen(false)
        setUpdatePost(newPost)
    }

    useEffect(() => {
        const likedPosts = JSON.parse(localStorage.getItem('likedPosts')) || {};
        setIsLiked(likedPosts[post._id] || false);
        setLike(post.likeCount);
    }, [post.likeCount , post._id]);

    return (
        <>
            {modalOpen && (
                <UpdatePost
                    open={modalOpen}
                    title="Update Post"
                    onOk={(newPost) => handleUpdatePost(newPost)}
                    onCancel={() => setModalOpen(false)}
                    posts={updatePost}
                />
            )}
            <Card
                hoverable
                title={<div className="flex items-center space-x-3">
                    <Avatar icon={<UserOutlined />} />
                    <div className="flex flex-col">
                        <p>{post.author}</p>
                        <p className="text-gray-400 text-sm" >{moment(post.createdAt).format('HH:MM MMM DD , YYYY')}</p>
                    </div>
                </div>}

                actions={[

                    <SettingOutlined key="setting" />,
                    <EditOutlined key="edit" onClick={handleModal} />,
                    <EllipsisOutlined key="ellipsis" />,
                ]}

                className="mb-0"
            >
                <h1 className="text-xl font-bold">{post.title}</h1>
                <p>{post.content}</p>

                <div className="flex mt-5">
                    {isLiked ? (
                        <LikeFilled  onClick={handleLike} style={{ color: '#00CCFF' }} />
                    ) : (
                        <LikeFilled  onClick={handleLike} style={{ color: 'gray' }}/>
                    )}
                    <p>{like} like</p>
                </div>
            </Card>
        </>
    )

}
