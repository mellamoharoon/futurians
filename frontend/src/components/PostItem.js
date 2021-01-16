import React from 'react'
import {Link} from 'react-router-dom'
import {Container, Row, Col, Card } from 'react-bootstrap'
import HandleLike from '../components/HandleLike'
import HandleDislike from '../components/HandleDislike'

const PostItem = ({post}) => {


    return (
        <Container>
          <Row>
            <Col>
            <Card style={{ width: '18rem', margin: 'auto' }}>
  <Card.Img variant="top" src={post.image} />
  <Card.Body>
    <Card.Title>{post.name} {post.name === "Haroon Khan" && <i style={{color: 'blue'}} className='fas fa-check-circle'></i>}</Card.Title>
    <Card.Text>
      {post.text}
    </Card.Text>
        <HandleLike post={post} />
        <HandleDislike post={post} />
    <Link to={`/posts/${post._id}`} className='btn btn-info'>
          Comment
        </Link>
  </Card.Body>
</Card>
            </Col>
            </Row>
        </Container>
    )
}

export default PostItem
