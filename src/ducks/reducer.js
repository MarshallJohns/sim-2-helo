const initialState = {
    username: '',
    user_id: 0,
    profilePicture: ''
}

const LOGIN_USER = 'LOGIN_USER'


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

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case LOGIN_USER: {
            return { ...state, username: action.payload.username, user_id: action.payload.user_id, profilePicture: action.payload.profile_pic }
        }
        default: return state
    }
}