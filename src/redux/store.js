import { configureStore } from '@reduxjs/toolkit'
import postSlice from './slices/PostSlice'

export const store = configureStore({
  reducer: {
    posts: postSlice
  },
})