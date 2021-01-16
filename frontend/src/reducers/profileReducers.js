import {CREATE_PROFILE_REQUEST, CREATE_PROFILE_SUCCESS, CREATE_PROFILE_FAIL,
GET_MY_PROFILE_REQUEST, GET_MY_PROFILE_SUCCESS, GET_MY_PROFILE_FAIL, GET_ALL_PROFILES_REQUEST,
GET_ALL_PROFILES_SUCCESS, GET_ALL_PROFILES_FAIL, PROFILE_BY_ID_REQUEST, PROFILE_BY_ID_SUCCESS,
PROFILE_BY_ID_FAIL, DELETE_PROFILE_REQUEST, DELETE_PROFILE_SUCCESS, DELETE_PROFILE_FAIL
} from '../constants/profileConstants'


export const createProfileReducer = (state = {}, action) => {
    switch(action.type) {
        case CREATE_PROFILE_REQUEST:
            return { loading: true}
        case CREATE_PROFILE_SUCCESS:
            return {loading: false, success: true, userInfo: action.payload}
        case CREATE_PROFILE_FAIL:
            return {loading: false, error: action.payload}
        default:
            return state
    }
}

export const getMyProfileReducer = (state = {profile: {}}, action) => {
    switch(action.type) {
        case GET_MY_PROFILE_REQUEST:
            return { loading: true}
        case GET_MY_PROFILE_SUCCESS:
            return {loading: false, profile: action.payload}
        case GET_MY_PROFILE_FAIL:
            return {loading: false, error: action.payload}
        default: 
            return state
    }
}


export const getAllProfilesReducer = (state = {profiles: []}, action) => {
    switch(action.type) {
        case GET_ALL_PROFILES_REQUEST:
            return { loading: true}
        case GET_ALL_PROFILES_SUCCESS:
            return {loading: false, profiles: action.payload}
        case GET_ALL_PROFILES_FAIL:
            return {loading: false, error: action.payload}
        default: 
            return state
    }
}



export const profileByIdReducer = (state = {profile: { user: {}}}, action) => {
    switch(action.type) {
        case PROFILE_BY_ID_REQUEST:
            return { loading: true}
        case PROFILE_BY_ID_SUCCESS:
            return {loading: false, profile: action.payload}
        case PROFILE_BY_ID_FAIL:
            return {loading: false, error: action.payload}
        default: 
            return state
    }
}


export const deleteProfileReducer = (state = {}, action) => {
    switch(action.type) {
        case DELETE_PROFILE_REQUEST:
            return { loading: true}
        case DELETE_PROFILE_SUCCESS:
            return {loading: false, success: true}
        case DELETE_PROFILE_FAIL:
            return {loading: false, error: action.payload}
        default: 
            return state
    }
}