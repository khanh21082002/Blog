import React , {useState} from 'react'
import { useDispatch } from 'react-redux'
import { Modal, Form, Input} from 'antd';
import * as api from '../../api/index'
import {useMutationHooks} from '../../hooks/useMutation'

const { TextArea } = Input;

export default function CreatePostModal(props) {
    const { open,onOk, onCancel, title } = props;


    const dispatch = useDispatch();

    const [data, setData] = useState({
        title: '',
        content: ''
    });

    const mutation = useMutationHooks(
        data => api.createPost(data)
    )

    const handleSubmitModal = () => {
        onOk(mutation.mutate(data));
        window.location.reload();
    }

    return (
        <Modal
            centered
            title={title}
            open={open}
            onOk={handleSubmitModal}
            onCancel={onCancel}

            okButtonProps={{ style: { backgroundColor: '#00CCFF'}}}
        >
            <div>
                <Form.Item label="Title" data={data.title}>
                    <Input  
                        placeholder='Enter your title...'
                        onChange={(e) => setData({ ...data, title: e.target.value })}
                        value={data.title}
                    />
                </Form.Item>

                <Form.Item label="Content" data={data.content}>
                    <TextArea rows={4} 
                        placeholder='Enter your content...'
                        onChange={(e) => setData({ ...data, content: e.target.value })}
                        value={data.content}
                    />
                        
                </Form.Item>
            </div>
        </Modal>
    )
}