import React from 'react'
import {Container, Jumbotron, Button} from 'react-bootstrap'
import {useSelector} from 'react-redux'
import {Link} from 'react-router-dom'

const HomeScreen = () => {

const userLogin = useSelector(state => state.userLogin)
const { userInfo} = userLogin


    return (
<Container fluid="md">
<Jumbotron>
  {!userInfo && <h2>Hello, futurians!</h2>}
  {userInfo && <h2>Hello, {`${userInfo.name}`}!</h2>}
  <p className='mx-auto'>
    Welcome to a social network which is made just for us
  </p>
  <p className='mx-auto'>
    {!userInfo && <Link to='/signup'><Button variant='warning'><i className='fas fa-user-plus'></i> Sign Up</Button></Link>}
  </p>
  <p className='mx-auto'>
    {!userInfo && <Link to='/signin'><Button variant='warning'><i className='fas fa-user-graduate'></i> Sign In</Button></Link>}
  </p>
  <p className='mx-auto'>
    {userInfo && <Link to='/posts'><Button variant='warning'><i className='fas fa-glass-cheers'></i> What's happening</Button></Link>}
  </p>
  <p className='mx-auto'>
  {userInfo && <Link to='/students'><Button variant='warning'><i className='fas fa-user-friends'></i> Find your friends</Button></Link>}
  </p>
</Jumbotron>
</Container>
    )
}

export default HomeScreen
