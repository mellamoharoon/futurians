import User from '../models/userModel.js'
import Post from '../models/postModel.js'
import Profile from '../models/profileModel.js'


// @route   POST api/posts  
// @desc    Create a post
// @access  Private
const createPost = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password')

        const newPost = new Post({
            text: req.body.text,
            image: req.body.image,
            name: user.name,
            user: req.user.id
        })


        const post = await newPost.save()

        res.json(post)
    } catch (err) {
        console.error(err.message)
        res.status(500).send('Server Error')
    }
   
}

// @route   GET api/posts  
// @desc    Get all posts
// @access  Private
const getPosts = async (req, res) => {
    try {
        const posts = await Post.find().sort({date: -1})
        res.json(posts)
    } catch (err) {
        console.error(err.message)
        res.status(500).send('Server Error')
    }
}

// @route   GET api/posts/:id 
// @desc    Get post by ID
// @access  Private
const getPostbyID = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)

        if(!post) {
            return res.status(404).json({msg: 'Post not found'})
        }

        res.json(post)
    } catch (err) {
        console.error(err.message)
        if(err.kind == 'ObjectId') {
            return res.status(404).json({msg: 'Post not found'})
        }
        res.status(500).send('Server Error')
    }
}

// @route   DELETE api/posts/:id
// @desc    Delete a post
// @access  Private
const deletePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)

        if(!post) {
            return res.status(404).json({msg: 'Post not found'})
        }

        // Check user
        if(post.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'User not authorized' })
        }

        await post.remove()

        res.json({msg: 'Post removed'})
    } catch (err) {
        console.error(err.message)
        if(err.kind == 'ObjectId') {
            return res.status(404).json({msg: 'Post not found'})
        }
        res.status(500).send('Server Error')
    }
}

// @route   PUT api/posts/like/:id
// @desc    Like a post
// @access  Private
const likePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)

        // Check is the post has already been liked
        if (post.likes.filter(like => like.user.toString() === req.user.id).length > 0) {
             // Get remove index
        const removeIndex = post.likes.map(like => like.user.toString()).indexOf(req.user.id)

        post.likes.splice(removeIndex, 1)

        await post.save()

        return res.json(post.likes)
        }

        post.likes.unshift({ user: req.user.id })

        await post.save()

        res.json(post.likes)
    } catch (err) {
        console.error(err.message)
        res.status(500).send('Server Error')
    }
}

// @route   PUT api/posts/dislike/:id
// @desc    Dislike a post
// @access  Private
const dislikePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)

        // Check is the post has already been disliked
        if (post.dislikes.filter(dislike => dislike.user.toString() === req.user.id).length > 0) {
             // Get remove index
        const removeIndex = post.dislikes.map(dislike => dislike.user.toString()).indexOf(req.user.id)

        post.dislikes.splice(removeIndex, 1)

        await post.save()

        return res.json(post.dislikes)
        }

        post.dislikes.unshift({ user: req.user.id })

        await post.save()

        res.json(post.dislikes)
    } catch (err) {
        console.error(err.message)
        res.status(500).send('Server Error')
    }
}


// @route   POST api/posts/comment/:id 
// @desc    Comment on a post
// @access  Private
const commentPost = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password')
        const post = await Post.findById(req.params.id)

        const newComment = {
            text: req.body.text,
            name: user.name,
            user: req.user.id
        }

        post.comments.unshift(newComment)

        await post.save()

        res.json(post.comments)
    } catch (err) {
        console.error(err.message)
        res.status(500).send('Server Error')
    }
   
}


// @route   DELETE api/posts/comment/:id/:comment_id
// @desc    Delete a comment
// @access  Private
const deleteComment = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)

        // Pull out comment
        const comment = post.comments.find(comment => comment.id === req.params.comment_id)

        // Make sure comment exist
        if(!comment) {
            return res.status(404).json({ msg: 'Comment does not exist' })
        }

        // Check user
        if(comment.user.toString() !== req.user.id) {
            return res.status(401).json({msg: 'User not authorized' })
        }

          // Get remove index
          const removeIndex = post.comments.map(comment => comment.user.toString()).indexOf(req.user.id)

          post.comments.splice(removeIndex, 1)
  
          await post.save()
  
          res.json(post.comments)
    } catch (err) {
        console.error(err.message)
        res.status(500).send('Server Error')
    }
}


export {createPost, getPosts, getPostbyID, deletePost, likePost, dislikePost, commentPost, deleteComment}