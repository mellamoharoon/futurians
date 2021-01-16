import React, { useState, useEffect } from 'react'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { profileCreate } from '../actions/profileActions'

const DashboardScreen = ({ history }) => {
  const [course, setCourse] = useState('')
  const [branch, setBranch] = useState('')
  const [year, setYear] = useState('')
  const [image, setImage] = useState('')
  const [hobbies, setHobbies] = useState('')
  const [bio, setBio] = useState('')
  const [uploading, setUploading] = useState(false)

  const dispatch = useDispatch({ history })


  const createProfile = useSelector((state) => state.createProfile)
  const { loading, error, success } = createProfile

  useEffect(() => {
    if (success) {
      history.push('/profile')
    }
  }, [success, history])



  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(profileCreate(course, branch, year, image, hobbies, bio, history))
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
    <FormContainer>
      <h2 style={{ textAlign: 'center' }}>Make your profile</h2>
      {success && <Message variant='success'>Profile Created Successfully</Message>}
      {error && <Message variant='danger'>{error}</Message>}
      {loading && <Loader />}
      <Form onSubmit={submitHandler}>
        <Form.Group controlId='branch'>
          <Form.Label>Course</Form.Label>
          <Form.Control as='select' value={course}
            onChange={(e) => setCourse(e.target.value)}
          >
            <option value=''>Select....</option>
            <option value="B.Tech">B.tech</option>
            <option value="B.Pharma">B.Pharma</option>
            <option value="MBA">MBA</option>
            <option value="B.sc">B.sc</option>
          </Form.Control>
        </Form.Group>

        <Form.Group controlId='branch'>
          <Form.Label>Branch</Form.Label>
          <Form.Control as='select' value={branch}
            onChange={(e) => setBranch(e.target.value)}
          >
            <option value=''>Select....</option>
            <option value="Computer Science">Computer Science</option>
            <option value="Mechanical Enginnering">Mechanical Enginnering</option>
            <option value="Electrical Engineering">Electrical Engineering</option>
            <option value="Civil Engineering">Civil Engineering</option>
          </Form.Control>
        </Form.Group>

        <Form.Group controlId='year'>
          <Form.Label>Year</Form.Label>
          <Form.Control as='select' value={year}
            onChange={(e) => setYear(e.target.value)}
          >
            <option value=''>Select....</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
          </Form.Control>
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

        <Form.Group controlId='hobbies'>
          <Form.Label>Hobbies</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter hobbies'
            value={hobbies}
            onChange={(e) => setHobbies(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='bio'>
          <Form.Label>Bio</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter bio'
            value={bio}
            onChange={(e) => setBio(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Button type='submit' variant='primary'>
          Update Profile
        </Button>
      </Form>
    </FormContainer>
  )
}

export default DashboardScreen
