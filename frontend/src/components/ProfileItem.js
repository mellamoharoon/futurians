import React from 'react'
import {Link} from 'react-router-dom'
import {Container, Card, Row, Col, Image} from 'react-bootstrap'


const ProfileItem = ({profile}) => {
    return (
    <Container>
     <Card className='mb-3'>
     <Row className='d-flex align-items-center flex-column mx-auto'>
      <Col>
      <Image className='mt-2 mx-auto' style={{width: '250px', height: '200px'}} src={profile.image} rounded />
      </Col>
      <Col>
     <Card.Body>
     <h5 className='font-weight-bold'>{profile.user.name}  {profile.user.name === "Haroon Khan" && <i style={{color: 'blue'}} className='fas fa-check-circle'></i>}</h5>
         <p>
          Course: {profile.course}
         </p>
         <p>
             Branch: {profile.branch}
         </p>
         <p>
             Year: {profile.year}
         </p>
         <Link to={`/students/${profile.user._id}`} className='btn btn-info'>
           View Profile
       </Link>
     </Card.Body>
      </Col>
      </Row>
     </Card>
    </Container>
    )
}

export default ProfileItem
