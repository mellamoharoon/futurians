import React, { useState } from 'react';
import {useDispatch} from 'react-redux'
import {Form, Button} from 'react-bootstrap'
import Loader from '../components/Loader'
import {createPost} from '../actions/postActions'

const PostForm = () => {
  const [text, setText] = useState('')
  const [image, setImage] = useState('')
  const [uploading, setUploading] = useState('')

  const dispatch = useDispatch()

  const submitHandler = (e) => {
    e.preventDefault()
   dispatch(createPost(text, image))
   setText('')
  }

  const postDetails = (e) => {
    const conn = e.target.files[0]
    const data = new FormData()
    data.append("file", conn)
    data.append("upload_preset", "futurians")
    data.append("cloud_name", "dfjn2qjua")
    setUploading(true)
    fetch("https://api.cloudinary.com/v1_1/dfjn2qjua/image/upload", {
      method: "post",
      body: data
    })
      .then(res => res.json())
      .then(data => {
        setImage(data.url)
        console.log(data);
        setUploading(false)
      })
      .catch(err => {
        console.log(err)
      })
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
          <Form.Label>Image</Form.Label>
          <Form.File
            id='image-file'
            label='Choose File'
            custom
            onChange={postDetails}
          ></Form.File>
          {uploading && <Loader />}
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