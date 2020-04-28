let patternsInitialState = {
    // Change the key-value pairs here
    patterns: []
  }
  
  // whatever gets returned from the reducer BECOMES the state
  let patternsReducer = (state = patternsInitialState, action) => {
  
    switch (action.type) {
  
      case "SET_ALL_PATTERNS":
  
        let theArrayOfPatterns = action.payload
        return {
          ...state,
          patterns: theArrayOfPatterns
        }
  
  
      case "ADD_ONE_PATTERN":
  
        let thePatternIwantToAdd = action.payload
        let copyOfPatterns = [...state.patterns, thePatternIwantToAdd]
  
        console.log(copyOfPatterns)
        return {
          ...state,
          patterns: copyOfPatterns
        }
  
  
      case "REMOVE_PATTERN":
        let thePatternID = action.payload
        let filteredPatterns = state.patterns.filter((pattern) => {
          return pattern.id !== thePatternID
        })
  
        return {
          ...state,
          patterns: filteredPatterns
        }
  
      default:
        return state
    }
  
  }

  export default patternsReducer