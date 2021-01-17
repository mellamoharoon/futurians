import React, {useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {Link} from 'react-router-dom'
import {Container, Row, Col, Image, Jumbotron, Badge, Button} from 'react-bootstrap'
import Loader from '../components/Loader'
import Message from '../components/Message'
import {getProfileById} from '../actions/profileActions'

const ProfileScreen = ({match}) => {

    const id = match.params.id

    const dispatch = useDispatch()

    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin

    const profileById = useSelector(state => state.profileById)
    const {loading, error, profile} = profileById

   useEffect(() => {
       dispatch(getProfileById(id))
   }, [dispatch, id])



    return (
        <>
      <Link className='btn btn-light my-3' to='/students'>
        Go Back
      </Link>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
         <Container>
  <Row>
    <Col className='mb-5'>
    <div className='d-flex align-items-center flex-column'>
    {!userInfo && <Link to='/signup'><Button className='mb-2' variant='info'> Create account to know more</Button></Link>}
      <Image className='mb-4' style={{margin: 'auto', width: '250px', height: '250px'}} src={profile.image} roundedCircle />
      <h4 className='mb-6 text-success font-weight-bold' style={{margin: 'auto'}}>{profile.user.name}{'  '}{profile.user.name === "Haroon Khan" && <i style={{color: 'blue'}} className='fas fa-check-circle'></i>}</h4>
      </div>
    </Col>
  </Row>
  <Row>
    <Col>
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
    </Col>
  </Row>
</Container>
        </>
      )}
    </>
    )
}

export default ProfileScreen
