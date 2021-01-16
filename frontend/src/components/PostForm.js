import React, { useState } from 'react';
import {useDispatch} from 'react-redux'
import {Form, Button} from 'react-bootstrap'
import {createPost} from '../actions/postActions'

const PostForm = () => {
  const [text, setText] = useState('')
  const [image, setImage] = useState('')

  const dispatch = useDispatch()

  const submitHandler = (e) => {
    e.preventDefault()
   dispatch(createPost(text, image))
   setText('')
   setImage('')
  }


  return (
      <Form onSubmit={submitHandler}>
                      <Form.Group controlId='text'>
                        <Form.Label>Say something...</Form.Label>
                        <Form.Control
                          as='textarea'
                          row='3'
                          value={text}
                          onChange={(e) => setText(e.target.value)}
                        ></Form.Control>
                      </Form.Group>

                      <Form.Group controlId='image'>
                        <Form.Label>Enter image url</Form.Label>
                        <Form.Control
                          as='input'
                          value={image}
                          onChange={(e) => setImage(e.target.value)}
                        ></Form.Control>
                      </Form.Group>

                      <Button
                        type='submit'
                        variant='primary'
                      >
                        Submit
                      </Button>
                    </Form>
  );
};



export default PostForm