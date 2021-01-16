import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ProfileItem from '../components/ProfileItem'
import { Row, Col } from 'react-bootstrap'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { allProfiles } from '../actions/profileActions'

const StudentsScreen = () => {

  const dispatch = useDispatch()

  const getAllProfiles = useSelector((state) => state.getAllProfiles)
  const { loading, error, profiles } = getAllProfiles

  useEffect(() => {
    dispatch(allProfiles())
  }, [dispatch])

  return (
    <>
      <h1 className='font-weight-bold' style={{textAlign: 'center'}}>STUDENTS</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          <Row>
            {profiles.map((profile) => (
              <Col key={profile._id}>
                  <ProfileItem profile={profile} />
              </Col>
            ))}
          </Row>
        </>
      )}
    </>
  )
}

export default StudentsScreen