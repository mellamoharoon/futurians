import axios from 'axios'
import {CREATE_POST_REQUEST, CREATE_POST_SUCCESS, CREATE_POST_FAIL, GET_POSTS_REQUEST, 
GET_POSTS_SUCCESS, GET_POSTS_FAIL, GET_POST_BY_ID_REQUEST, GET_POST_BY_ID_SUCCESS, GET_POST_BY_ID_FAIL,
DELETE_POST_REQUEST, DELETE_POST_SUCCESS, DELETE_POST_FAIL, LIKE_POST_REQUEST, LIKE_POST_SUCCESS,
LIKE_POST_FAIL, DISLIKE_POST_REQUEST, DISLIKE_POST_SUCCESS, DISLIKE_POST_FAIL, COMMENT_REQUEST,
COMMENT_SUCCESS, COMMENT_FAIL, DELETE_COMMENT_REQUEST, DELETE_COMMENT_SUCCESS, DELETE_COMMENT_FAIL
} from '../constants/postConstants'

export const createPost = (text, image) => async (dispatch, getState) => {
    try {
      dispatch({
        type: CREATE_POST_REQUEST,
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
        '/api/posts',
        {text, image},
        config
      )
  
      dispatch({
        type: CREATE_POST_SUCCESS,
        payload: data,
      })

    } catch (error) {
      dispatch({
        type: CREATE_POST_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }


  export const getPostsAction = () => async (dispatch, getState) => {
    try {
      dispatch({
        type: GET_POSTS_REQUEST,
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
  
      const { data } = await axios.get(
        '/api/posts',
        config
      )
  
      dispatch({
        type: GET_POSTS_SUCCESS,
        payload: data,
      })

    } catch (error) {
      dispatch({
        type: GET_POSTS_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }


  export const getPostByIdAction = (id) => async (dispatch, getState) => {
    try {
      dispatch({
        type: GET_POST_BY_ID_REQUEST,
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
  
      const { data } = await axios.get(
        `/api/posts/${id}`,
        config
      )
  
      dispatch({
        type: GET_POST_BY_ID_SUCCESS,
        payload: data,
      })

    } catch (error) {
      dispatch({
        type: GET_POST_BY_ID_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }


  
export const deletePostAction = (id) => async (dispatch, getState) => {
  try {
      dispatch({
          type: DELETE_POST_REQUEST
      })

      const {userLogin: {userInfo}} = getState()

      const config = {
          headers: {
              Authorization: `Bearer ${userInfo.token}`
          }
      }

      await axios.delete(`/api/posts/${id}`, config)

      dispatch({
          type: DELETE_POST_SUCCESS
      })

  } catch (error) {
      dispatch({
          type: DELETE_POST_FAIL,
          payload: error.response && error.response.data.message ? error.response.data.message :
          error.message
      })
  }
}


export const likePostAction = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: LIKE_POST_REQUEST,
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

    const { data } = await axios.put(
      `/api/posts/like/${id}`, userInfo,
      config
    )

    dispatch({
      type: LIKE_POST_SUCCESS,
      payload: data,
    })

  } catch (error) {
    dispatch({
      type: LIKE_POST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}


export const dislikePostAction = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: DISLIKE_POST_REQUEST,
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

    const { data } = await axios.put(
      `/api/posts/dislike/${id}`, userInfo,
      config
    )

    dispatch({
      type: DISLIKE_POST_SUCCESS,
      payload: data,
    })

  } catch (error) {
    dispatch({
      type: DISLIKE_POST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}


export const createComment = (id, text) => async (dispatch, getState) => {
  try {
    dispatch({
      type: COMMENT_REQUEST,
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
      `/api/posts/comment/${id}`,
      {text},
      config
    )

    dispatch({
      type: COMMENT_SUCCESS,
      payload: data,
    })

  } catch (error) {
    dispatch({
      type: COMMENT_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}



export const deleteCommentAction = (id, comment_id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: DELETE_COMMENT_REQUEST,
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

    await axios.delete(
      `/api/posts/comment/${id}/${comment_id}`,
      config
    )

    dispatch({
      type: DELETE_COMMENT_SUCCESS,
    })

  } catch (error) {
    dispatch({
      type: DELETE_COMMENT_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}