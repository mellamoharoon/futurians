import axios from 'axios'
import {CREATE_PROFILE_REQUEST, CREATE_PROFILE_SUCCESS, CREATE_PROFILE_FAIL,
GET_MY_PROFILE_REQUEST, GET_MY_PROFILE_SUCCESS, GET_MY_PROFILE_FAIL,
GET_ALL_PROFILES_REQUEST, GET_ALL_PROFILES_SUCCESS, GET_ALL_PROFILES_FAIL, PROFILE_BY_ID_REQUEST,
PROFILE_BY_ID_SUCCESS, PROFILE_BY_ID_FAIL, DELETE_PROFILE_REQUEST, DELETE_PROFILE_SUCCESS,
DELETE_PROFILE_FAIL
} from '../constants/profileConstants'


export const profileCreate = (course, branch, year, image, hobbies, bio) => async (dispatch, getState) => {
    try {
      dispatch({
        type: CREATE_PROFILE_REQUEST,
      })

      const {
        userLogin: { userInfo },
      } = getState()
  
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      }
  
      const { data } = await axios.post(
        '/api/profile',
        { course, branch, year, image, hobbies, bio },
        config
      )
  
      dispatch({
        type: CREATE_PROFILE_SUCCESS,
        payload: data,
      })

    } catch (error) {
      dispatch({
        type: CREATE_PROFILE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }


  
export const myProfile = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: GET_MY_PROFILE_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.get('/api/profile/me', config)

    dispatch({
      type: GET_MY_PROFILE_SUCCESS,
      payload: data,
    })
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    dispatch({
      type: GET_MY_PROFILE_FAIL,
      payload: message,
    })
  }
}



export const allProfiles = () => async (dispatch) => {
  try {
    dispatch({
      type: GET_ALL_PROFILES_REQUEST,
    })

    const { data } = await axios.get('/api/profile')

    dispatch({
      type: GET_ALL_PROFILES_SUCCESS,
      payload: data,
    })
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    dispatch({
      type: GET_ALL_PROFILES_FAIL,
      payload: message,
    })
  }
}


export const getProfileById = (id) => async (dispatch) => {
  try {
    dispatch({
      type: PROFILE_BY_ID_REQUEST,
    })

    const { data } = await axios.get(`/api/profile/user/${id}`)

    dispatch({
      type: PROFILE_BY_ID_SUCCESS,
      payload: data,
    })
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    dispatch({
      type: PROFILE_BY_ID_FAIL,
      payload: message,
    })
  }
}


export const deleteMyProfile = () => async (dispatch, getState) => {
  try {
      dispatch({
          type: DELETE_PROFILE_REQUEST
      })

      const {userLogin: {userInfo}} = getState()

      const config = {
          headers: {
              Authorization: `Bearer ${userInfo.token}`
          }
      }

      await axios.delete(`/api/profile`, config)

      dispatch({
          type: DELETE_PROFILE_SUCCESS
      })

  } catch (error) {
      dispatch({
          type: DELETE_PROFILE_FAIL,
          payload: error.response && error.response.data.message ? error.response.data.message :
          error.message
      })
  }
}



