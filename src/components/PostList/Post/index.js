import React, { useEffect, useState } from "react";
import { Card, Avatar } from 'antd';
import moment from 'moment'
import { useDispatch } from 'react-redux'
import * as api from '../../../api/index';
import { useMutationHooks } from '../../../hooks/useMutation';

import { UserOutlined, LikeOutlined, SettingOutlined, EditOutlined, EllipsisOutlined } from '@ant-design/icons';
import UpdatePost from "./UpdatePost";

export default function Post({ post }) {

    const [like, setLike] = useState(post.likeCount);
    const [modalOpen, setModalOpen] = useState(false);
   
   const mutation = useMutationHooks(
       (data) => api.updatePost( post._id , data,),
       {
           onSuccess: (data) => {
               // Cập nhật trạng thái like sau khi mutation thành công
               setLike(data.likeCount);
           }
       }
   );

    const dispatch = useDispatch();

    const handleLike = async () => {
        const updatedLikeCount = like + 1;
        setLike(updatedLikeCount); // Cập nhật trạng thái like ngay lập tức
        mutation.mutate({ likeCount: updatedLikeCount }); // Gọi API cập nhật likeCount
    }
    const handleModal = () => {
        setModalOpen(true);
    }

    useEffect(() => {
        setLike(post.likeCount);
    }, [post.likeCount]);

    return (
        <>
            {modalOpen && (
                <UpdatePost
                    open={modalOpen}
                    title="Update Post"
                    onOk={() => setModalOpen(false)}
                    onCancel={() => setModalOpen(false)}
                    posts={post}
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
                    <LikeOutlined onClick={handleLike}/>
                    <p>{like} like</p>
                </div>
            </Card>
        </>
    )

}
