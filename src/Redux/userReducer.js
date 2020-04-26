let userInitialState = {
    user: {
        id: 0,
        username: "",
        user_patterns: [],
        favorite_patterns: []
    },
    token: ""
  }
  
const userReducer = (state = userInitialState, action) => {
  
    switch (action.type) {
        case "SET_USER_INFORMATION":
            return {
                ...state,
                user: action.payload.user,
                token: action.payload.jwt
            }
        default:
            return state
    }
  
}

export default userReducer