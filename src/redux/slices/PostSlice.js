import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    title: '',
    content: '',
    author: 'admin',
    likeCount: 0,
};

export const postSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        updatePost(state, action) {
           const {title ='', content = '' } = action.payload
           state.title = title ? title : state.title
           state.content = content ? content : state.content
        },
    }
});

export const { addPost, removePost } = postSlice.actions;
export default postSlice.reducer;