const initialState = {
    username: '',
    user_id: 0,
    profilePicture: ''
}

const LOGIN_USER = 'LOGIN_USER'


export function loginUser(user) {
    return {
        type: LOGIN_USER,
        payload: user
    }
}

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case LOGIN_USER: {
            return { ...state, username: action.payload.username, user_id: action.payload.id, profilePicture: action.payload.profile_pic }
        }
        default: return state
    }
}