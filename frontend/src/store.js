import { createStore, combineReducers, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import {userLoginReducer, userRegisterReducer} from './reducers/userReducers'
import {createProfileReducer, getMyProfileReducer, getAllProfilesReducer, profileByIdReducer,
deleteProfileReducer
} from './reducers/profileReducers'
import {createPostReducer, getPostsReducer, getPostByIdReducer, deletePostReducer, likePostReducer, 
dislikePostReducer, commentReducer, deleteCommentReducer
} from './reducers/postReducers'

const reducer = combineReducers({
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    createProfile: createProfileReducer,
    getMyProfile: getMyProfileReducer,
    getAllProfiles: getAllProfilesReducer,
    profileById: profileByIdReducer,
    deleteProfile: deleteProfileReducer,
    createPost: createPostReducer,
    getPosts: getPostsReducer,
    getPostById: getPostByIdReducer,
    deletePost: deletePostReducer,
    likePost: likePostReducer,
    dislikePost: dislikePostReducer,
    comment: commentReducer,
    deleteComment: deleteCommentReducer
})

const userInfoFromStorage = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null

const initialState = {
    userLogin: {userInfo: userInfoFromStorage}
}

const middleware = [thunk]

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))

export default store