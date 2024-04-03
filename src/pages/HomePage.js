import React, { useState } from "react";
import { Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";

import Header from "../components/Header";
import PostList from "../components/PostList";
import CreatePostModal from "../components/CreatePostModal";


export default function HomePage() {
    const [modalOpen, setModalOpen] = useState(false);

    const handleModal = () => {
        setModalOpen(true);
    }

    return (
        <>
            <div className='max-w-7xl mx-auto h-full' >
                <Header />
                <PostList/>
                {modalOpen && (
                    <CreatePostModal
                        open={modalOpen}
                        title="Create Post"
                        onOk={() => setModalOpen(false)}
                        onCancel={() => setModalOpen(false)}
                    />
                )}
                <Button
                    className='bg-[#00CCFF] text-white bottom-20 right-40 fixed'
                    type="primary"
                    shape="circle"
                    icon={<PlusOutlined />}
                    size='large'
                    onClick={() => handleModal()}
                />

               
            </div>

        </>
    )
}