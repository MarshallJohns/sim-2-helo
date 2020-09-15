const initialState = {
    username: '',
    id: '',
    profilePicture: ''
}

const LOGIN_USER = 'LOGIN_USER'


export function loginUser(userId, username, profilePicture) {
    return {
        type: LOGIN_USER,
        payload: {
            username: username,
            id: userId,
            profilePicture: profilePicture
        }
    }
}

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case LOGIN_USER: {
            return { ...state, username: action.payload.username, id: action.payload.userId, profilePicture: action.payload.profilePicture }
        }
        default: return state
    }
}