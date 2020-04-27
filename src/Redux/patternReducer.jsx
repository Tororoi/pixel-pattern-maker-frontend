let patternInitialState = {
    // Change the key-value pairs here
    pattern: {}
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
      default:
        return state
    }
  
  }

  export default patternReducer