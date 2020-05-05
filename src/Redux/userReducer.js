let userInitialState = {
    user: {
        id: 0,
        username: "",
        patterns: [],
        favorites: []
    },
    token: "",
    profile: "My Patterns"
  }
  
const userReducer = (state = userInitialState, action) => {
  
    switch (action.type) {
        case "SET_USER_INFORMATION":
            return {
                ...state,
                user: action.payload.user,
                token: action.payload.jwt
            }
        case "ADD_FAVORITE":
            // console.log(action.payload)
            // console.log(state.user.favorites)
            return {
                ...state,
                user: {
                    ...state.user,
                    favorites: [...state.user.favorites, action.payload]
                }
            }
        case "REMOVE_FAVORITE":
            let badFav = action.payload
            let newFavArray = state.user.favorites.filter(fav => {
                return fav !== badFav
            })
            return {
                ...state,
                user: {
                    ...state.user,
                    favorites: newFavArray
                }
            }
        case "PROFILE_SWITCH":
            return {
                ...state,
                profile: action.payload
            }
        default:
            return state
    }
  
}

export default userReducer