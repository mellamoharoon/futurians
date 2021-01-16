import React, {useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {Link} from 'react-router-dom'
import {Container, Row, Col, Button, Image, ListGroup, Badge, Jumbotron} from 'react-bootstrap'
import PostForm from '../components/PostForm'
import Loader from '../components/Loader'
import Message from '../components/Message'
import {myProfile, deleteMyProfile} from '../actions/profileActions'


const ProfileScreen = ({history}) => {

    const dispatch = useDispatch()

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    const getMyProfile = useSelector(state => state.getMyProfile)
    const {loading, error, profile} = getMyProfile

    const deleteProfile = useSelector(state => state.deleteProfile)
    const {loading: loadingDelete, error: errorDelete, success} = deleteProfile

    const createPost = useSelector(state => state.createPost)
    const {success: successPost} = createPost

   useEffect(() => {
     if(!userInfo) {
      history.push('/')
     } else {
       dispatch(myProfile())
     }
   }, [userInfo, dispatch, success, history, errorDelete, successPost])

   const deleteHandler = () => {
    if(window.confirm('Are you sure')){
    dispatch(deleteMyProfile())
    }
}


    return (
        <>
      <Link className='btn btn-light my-3' to='/'>
        Go Back
      </Link>
      {loadingDelete && <Loader />}
      {successPost && <Message variant='success'>Posted Successfully</Message>}
      {errorDelete && <Message variant='danger'>{errorDelete}</Message>}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
         <Container>
  <Row>
  <Col className='mb-4'>
    <div className='d-flex align-items-center flex-column'>
      <Image className='mb-4' style={{margin: 'auto', width: '250px', height: '250px'}} src={profile.image} roundedCircle />
      <h4 className='mb-6 text-info font-weight-bold' style={{margin: 'auto'}}>{userInfo.name}</h4>
      </div>
    </Col>
    <Col className='mb-4'>
    <PostForm />
    </Col>
  </Row>
  <Row>
    <Col>
<Jumbotron fluid>
  <Container>
  <div>
  <h4 >
    <Badge variant="warning">Course</Badge> {profile.course} 
  </h4>
  <h4>
    <Badge variant="warning">Branch</Badge> {profile.branch}
  </h4>
  <h4>
    <Badge variant="warning">Year</Badge> {profile.year}
  </h4>
</div>
  </Container>
</Jumbotron>

<Jumbotron fluid>
  <Container>
    <h4>
  <Badge variant="info">Hobbies</Badge> <em>{profile.hobbies}</em>
  </h4>
  <h4>
  <Badge variant="info">Bio</Badge> <em>{profile.bio}</em>
  </h4>
  </Container>
</Jumbotron>
    </Col>
  </Row>
  <Row>
  <Col>
    <ListGroup variant='flush'>
       <ListGroup.Item>
         <h3>Delete your account</h3>
       <Button variant='danger' className='btn-sm' onClick={() => deleteHandler()}>
      <i className='fas fa-trash'></i>
    </Button>
 </ListGroup.Item>
     </ListGroup>
    </Col>
  </Row>
</Container>
        </>
      )}
    </>
    )
}

export default ProfileScreen
