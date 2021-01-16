import React, { useState, useEffect } from 'react';
import {useSelector, useDispatch} from 'react-redux'
import {Container, Row, Col, Form, Button, ListGroup} from 'react-bootstrap'
import Message from '../components/Message'
import {createComment, deleteCommentAction} from '../actions/postActions'

const PostForm = ({post, history}) => {
  const [text, setText] = useState('')

  const dispatch = useDispatch()

  const userLogin = useSelector(state => state.userLogin)
  const {userInfo} = userLogin

  const comment = useSelector(state => state.comment)
  const {success: successComment} = comment

  const deleteComment = useSelector(state => state.deleteComment)
  const {success} = deleteComment

  useEffect(() => {
    if(!userInfo) {
      history.push('/login')
    }
  }, [userInfo, success, history, successComment])

  const submitHandler = (e) => {
    e.preventDefault()
   dispatch(createComment(post._id, text))
   setText('')
  }

  return (
    <Container>
      {successComment && <Message variant='success'>Commented successfully</Message>}
      <Form className='mx-auto' onSubmit={submitHandler}>
                      <Form.Group controlId='text'>
                        <Form.Control
                          as='textarea'
                          row='3'
                          value={text}
                          onChange={(e) => setText(e.target.value)}
                        ></Form.Control>
                      </Form.Group>

                      <Button
                        type='submit'
                        variant='warning'
                      >
                        Comment
                      </Button>
                    </Form>

            <Row>
            <Col md={6} className='mx-auto'>
              <h2>Comments</h2>
              {post.comments.length === 0 && <Message>No Commments</Message>}
              <ListGroup variant='flush'>
            
                {post.comments.map((comment) => (
                  <ListGroup.Item className='mb-4 border border-primary' key={comment._id}>
                      {userInfo._id && comment.user === userInfo._id && (
        <Button
        className='align-text-bottom'
          onClick={() => dispatch(deleteCommentAction(post._id, comment._id))}
          type="button"
          variant='danger'
        >
          <i className="fas fa-times" />
        </Button>
      )}
                    <h5 className='font-weight-bold'>{comment.name}</h5>
                    <p className='font-italic'>{comment.date.substring(0, 10)}</p>
                    <p>{comment.text}</p>
                  </ListGroup.Item>
                ))}
                </ListGroup>
                </Col>
                </Row> 
                </Container>
 )
};



export default PostForm