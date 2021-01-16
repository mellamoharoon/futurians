import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import PostItem from '../components/PostItem'
import { Row, Col } from 'react-bootstrap'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { getPostsAction } from '../actions/postActions'

const PostsListScreen = () => {

  const dispatch = useDispatch()

  const getPosts = useSelector((state) => state.getPosts)
  const { loading, error, posts } = getPosts

  
  const likePost = useSelector(state => state.likePost)
  const {error: errorLike} = likePost

  useEffect(() => {
    dispatch(getPostsAction())
  }, [dispatch, errorLike])

  return (
    <>
      <h1 className='font-weight-bold' style={{textAlign: 'center'}}>POSTS</h1>
      {errorLike && (<Message variant='danger'>{errorLike}</Message>)}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          <Row>
            {posts.map((post) => (
              <Col className='mb-4' key={post._id}>
                <PostItem post={post} />
              </Col>
            ))}
          </Row>
        </>
      )}
    </>
  )
}

export default PostsListScreen