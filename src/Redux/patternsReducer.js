let patternsInitialState = {
    // Change the key-value pairs here
    patterns: []
  }
  
  // whatever gets returned from the reducer BECOMES the state
  let patternsReducer = (state = patternsInitialState, action) => {
  
    switch (action.type) {
  
      case "SET_ALL_PATTERNS":
        //Dispatch defined in App.js
        //Called from App.js
        let theArrayOfPatterns = action.payload
        return {
          ...state,
          patterns: theArrayOfPatterns
        }
  
  
      case "ADD_ONE_PATTERN":
        //Dispatch defined in App.js
        //Called from App.js
        let thePatternIwantToAdd = action.payload
        let copyOfPatterns = [...state.patterns, thePatternIwantToAdd]
  
        return {
          ...state,
          patterns: copyOfPatterns
        }
  

      case "REPLACE_PATTERN":
        //Dispatch defined in App.js
        //Called from App.js
        let updatedPattern = action.payload
        function checkID(pattern) {
          return pattern.id === updatedPattern.id
        }
        let oldPattern = state.patterns.find(checkID)
        let patternIndex = state.patterns.indexOf(oldPattern)
        let updatedPatternsArray = [...state.patterns]
        updatedPatternsArray[patternIndex] = updatedPattern

        return {
          ...state,
          patterns: updatedPatternsArray
        }        
  
      case "REMOVE_PATTERN":
        //Dispatch defined in App.js
        //Called from App.js
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