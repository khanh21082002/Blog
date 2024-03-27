import React, { useState } from "react";
import { Card, Avatar } from 'antd';
import moment from 'moment'
import { UserOutlined, LikeOutlined, SettingOutlined, EditOutlined, EllipsisOutlined } from '@ant-design/icons';
import UpdatePost from "./UpdatePost";

export default function Post({ post }) {
    const [modalOpen, setModalOpen] = useState(false);

    const handleModal = () => {
        setModalOpen(true);
    }

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
                    <EditOutlined key="edit" onClick={() => handleModal()} />,
                    <EllipsisOutlined key="ellipsis" />,
                ]}

                className="mb-0"
            >
                <h1 className="text-xl font-bold">{post.title}</h1>
                <p>{post.content}</p>

                <div className="flex mt-5">
                    <LikeOutlined />
                    <p>{post.likeCount} like</p>
                </div>
            </Card>
        </>
    )

}