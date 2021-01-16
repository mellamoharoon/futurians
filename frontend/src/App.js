import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import Header from './components/Header'
import Footer from './components/Footer'
import HomeScreen from './screens/HomeScreen'
import LoginScreen from './screens/LoginScreen'
import RegisterScreen from './screens/RegisterScreen'
import ProfileScreen from './screens/ProfileScreen'
import DashboardScreen from './screens/DashboardScreen'
import StudentsScreen from './screens/StudentsScreen'
import StudentProfileScreen from './screens/StudentProfileScreen'
import PostsListScreen from './screens/PostsListScreen'
import PostScreen from './screens/PostScreen'


const App = () => {

  return (
    <Router>
      <Header />
      <main className='py-3'>
        <Container>
          <Route exact path='/' component={HomeScreen} />
          <Route path='/login' component={LoginScreen} />
          <Route path='/signup' component={RegisterScreen} />
          <Route path='/profile' component={ProfileScreen} />
          <Route path='/dashboard' component={DashboardScreen} />
          <Route path='/students' component={StudentsScreen} exact />
          <Route path='/students/:id' component={StudentProfileScreen} />
          <Route path='/posts' component={PostsListScreen} exact />
          <Route path='/posts/:id' component={PostScreen} />
        </Container>
      </main>
      <Footer />
    </Router>
  )
}

export default App
