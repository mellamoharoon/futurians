import express from 'express'
const router = express.Router()

import {protect} from '../middleware/authMiddleware.js'

import {createPost, getPosts, getPostbyID, deletePost, likePost, dislikePost, commentPost, deleteComment} from '../controllers/postController.js'

router.route('/').post(protect, createPost)

router.route('/').get(protect, getPosts)

router.route('/:id').get(protect, getPostbyID)

router.route('/:id').delete(protect, deletePost)

router.route('/like/:id').put(protect, likePost)

router.route('/dislike/:id').put(protect, dislikePost)

router.route('/comment/:id').post(protect, commentPost)

router.route('/comment/:id/:comment_id').delete(protect, deleteComment)

export default router