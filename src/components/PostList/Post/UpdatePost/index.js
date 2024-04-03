import React, { useState } from 'react';
import { Modal, Form, Input} from 'antd';
import * as api from '../../../../api/index';
import { useMutationHooks } from '../../../../hooks/useMutation';

const { TextArea } = Input;

export default function UpdatePost({ open,onOk, onCancel, title, posts }) {

    const [data, setData] = useState({
        title: posts.title,
        content: posts.content
    });

    const mutation = useMutationHooks(
        data => api.updatePost(posts._id ,data),
        {
            onSuccess: (data) => {
                onOk(data);
            }
        }
    );

    const handleSubmitModal = () => {
        mutation.mutate(data);
    };

    return (
        <Modal
            centered
            title={title}
            onOk={handleSubmitModal}
            onCancel={onCancel}
            open={open}
            okButtonProps={{ style: { backgroundColor: '#00CCFF' }}}
        >
            <div>
                <Form.Item label="Title">
                    <Input  
                        placeholder='Enter your title...'
                        onChange={(e) => setData({ ...data, title: e.target.value })}
                        value={data.title}
                    />
                </Form.Item>

                <Form.Item label="Content">
                    <TextArea rows={4} 
                        placeholder='Enter your content...'
                        onChange={(e) => setData({ ...data, content: e.target.value })}
                        value={data.content}
                    />
                        
                </Form.Item>
            </div>
        </Modal>
    );
}
