import express from 'express';
import {getPosts , createPosts , updatePosts , deletePosts} from '../controllers/posts.js';

const router = express.Router();

router.get('/',getPosts )
router.post('/', createPosts )
router.put('/update/:id', updatePosts )
router.delete('/delete/:id', deletePosts )

export default router