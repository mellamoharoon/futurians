import React, {useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {Link} from 'react-router-dom'
import CommentForm from '../components/CommentForm'
import {Container, Row, Col, Card} from 'react-bootstrap'
import Loader from '../components/Loader'
import Message from '../components/Message'
import {getPostByIdAction, deletePostAction} from '../actions/postActions'

const PostScreen = ({match, history}) => {

    const id = match.params.id

    const dispatch = useDispatch()

    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin

    const getPostById = useSelector(state => state.getPostById)
    const {loading, error, post} = getPostById

    const deletePost = useSelector(state => state.deletePost)
    const {success} = deletePost



   useEffect(() => {
    if(!userInfo) {
      history.push('/')
    } else {
       dispatch(getPostByIdAction(id))
       if(success) {
         history.push('/posts')
       }
    }
   }, [userInfo, dispatch, success, history, id])


    return (
        <>
      <Link className='btn btn-light my-3' to='/posts'>
        Go Back
      </Link>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Container>
            <Row>
                <Col>
                {userInfo._id && post.user === userInfo._id && (
            <button
              onClick={() => dispatch(deletePostAction(post._id))}
              type="button"
              className="btn btn-danger"
            >
              <i className="fas fa-times" />
            </button>
          )}
                <Card className='mb-4' style={{ width: '18rem', margin: 'auto' }}>
  <Card.Img variant="top" src={post.image} />
  <Card.Body>
    <Card.Title>{post.name}</Card.Title>
    <Card.Text>
      {post.text}
    </Card.Text>
  </Card.Body>
</Card>
                </Col>
            </Row>

            <Row>
              <CommentForm post={post} />
            </Row>

            
        </Container>
    )}
    </>
    )
}

export default PostScreen
