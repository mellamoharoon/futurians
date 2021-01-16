import {CREATE_POST_REQUEST, CREATE_POST_SUCCESS, CREATE_POST_FAIL, GET_POSTS_REQUEST,
GET_POSTS_SUCCESS, GET_POSTS_FAIL, GET_POST_BY_ID_REQUEST, GET_POST_BY_ID_SUCCESS, GET_POST_BY_ID_FAIL,
DELETE_POST_REQUEST, DELETE_POST_SUCCESS, DELETE_POST_FAIL, LIKE_POST_REQUEST, LIKE_POST_SUCCESS, LIKE_POST_FAIL,
DISLIKE_POST_REQUEST, DISLIKE_POST_SUCCESS, DISLIKE_POST_FAIL, COMMENT_REQUEST, COMMENT_SUCCESS, COMMENT_FAIL,
DELETE_COMMENT_REQUEST, DELETE_COMMENT_SUCCESS, DELETE_COMMENT_FAIL
} from '../constants/postConstants'

export const createPostReducer = (state = { posts: [] }, action) => {
    switch(action.type) {
        case CREATE_POST_REQUEST:
            return { loading: true}
        case CREATE_POST_SUCCESS:
            return {loading: false, success: true, posts: action.payload}
        case CREATE_POST_FAIL:
            return {loading: false, error: action.payload}
        default: 
            return state
    }
}

export const getPostsReducer = (state = { posts: [] }, action) => {
    switch(action.type) {
        case GET_POSTS_REQUEST:
            return { loading: true}
        case GET_POSTS_SUCCESS:
            return {loading: false, posts: action.payload}
        case GET_POSTS_FAIL:
            return {loading: false, error: action.payload}
        default: 
            return state
    }
}


export const getPostByIdReducer = (state = { post: {comments: []} }, action) => {
    switch(action.type) {
        case GET_POST_BY_ID_REQUEST:
            return { loading: true}
        case GET_POST_BY_ID_SUCCESS:
            return {loading: false, post: action.payload}
        case GET_POST_BY_ID_FAIL:
            return {loading: false, error: action.payload}
        default: 
            return state
    }
}



export const deletePostReducer = (state = {}, action) => {
    switch(action.type) {
        case DELETE_POST_REQUEST:
            return { loading: true}
        case DELETE_POST_SUCCESS:
            return {loading: false, success: true}
        case DELETE_POST_FAIL:
            return {loading: false, error: action.payload}
        default: 
            return state
    }
}



export const likePostReducer = (state = { post: {}}, action) => {
    switch(action.type) {
        case LIKE_POST_REQUEST:
            return { loading: true, success: false}
        case LIKE_POST_SUCCESS:
            return {loading: false, post: action.payload, success: true}
        case LIKE_POST_FAIL:
            return {loading: false, success: false, error: action.payload}
        default: 
            return state
    }
}

export const dislikePostReducer = (state = { post: {}}, action) => {
    switch(action.type) {
        case DISLIKE_POST_REQUEST:
            return { loading: true}
        case DISLIKE_POST_SUCCESS:
            return {loading: false, post: action.payload, success: true}
        case DISLIKE_POST_FAIL:
            return {loading: false, error: action.payload}
        default: 
            return state
    }
}


export const commentReducer = (state = {}, action) => {
    switch(action.type) {
        case COMMENT_REQUEST:
            return { loading: true}
        case COMMENT_SUCCESS:
            return {loading: false, success: true}
        case COMMENT_FAIL:
            return {loading: false, error: action.payload}
        default: 
            return state
    }
}


export const deleteCommentReducer = (state = { }, action) => {
    switch(action.type) {
        case DELETE_COMMENT_REQUEST:
            return { loading: true}
        case DELETE_COMMENT_SUCCESS:
            return {loading: false, success:true}
        case DELETE_COMMENT_FAIL:
            return {loading: false, error: action.payload, success:false}
        default: 
            return state
    }
}