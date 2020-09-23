const initialState = {
    username: '',
    user_id: '',
    profilePicture: ''
}

const LOGIN_USER = 'LOGIN_USER'
const GET_USER = 'GET_USER'
const LOGOUT_USER = 'LOGOUT_USER'


export function loginUser(username, userId, profile_pic) {
    return {
        type: LOGIN_USER,
        payload: {
            username: username,
            user_id: userId,
            profile_pic: profile_pic
        }
    }
}

export function getUser(user) {
    return {
        type: GET_USER,
        payload: user
    }
}

export function logoutUser() {
    return {
        type: LOGOUT_USER,
        payload: null
    }
}


export default function reducer(state = initialState, action) {
    switch (action.type) {
        case LOGIN_USER: {
            return { ...state, username: action.payload.username, user_id: action.payload.id, profilePicture: action.payload.profile_pic }
        }
        case GET_USER: {
            return { ...state, username: action.payload.username, user_id: action.payload.id, profilePicture: action.payload.profile_pic }
        }
        case LOGOUT_USER: {
            return initialState
        }

        default: return state
    }
}