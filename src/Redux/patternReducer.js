let patternInitialState = {
    // Change the key-value pairs here
    pattern: {},
    currentPalette: {}
  }
  
  // whatever gets returned from the reducer BECOMES the state
  let patternReducer = (state = patternInitialState, action) => {
  
    switch (action.type) {
  
      case "SET_CURRENT_PATTERN":
 
        let newPattern = action.payload
        return {
          ...state,
          pattern: newPattern
        }
      case "SET_CURRENT_PALETTE":

        let newPalette = action.payload
        return {
          ...state,
          currentPalette: newPalette
        }
      case "RESET_PATTERN_STATE":
        return {
          pattern: {},
          currentPalette: {}
        }
      default:
        return state
    }

  }

  export default patternReducer