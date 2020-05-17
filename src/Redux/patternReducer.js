let patternInitialState = {
    // Change the key-value pairs here
    pattern: {},
    currentPalette: {}
  }
  
  // whatever gets returned from the reducer BECOMES the state
  let patternReducer = (state = patternInitialState, action) => {
  
    switch (action.type) {
  
      case "SET_CURRENT_PATTERN":
        //Dispatch defined in App.js
        //Called from App.js, Pattern.jsx
        let newPattern = action.payload
        return {
          ...state,
          pattern: newPattern
        }
      case "SET_CURRENT_PALETTE":
        //Dispatch defined in Pattern.jsx
        //Called from Pattern.jsx
        let newPalette = action.payload
        return {
          ...state,
          currentPalette: newPalette
        }
      case "RESET_PATTERN_STATE":
        //Dispatch defined in ToolContainer.jsx
        //Called from ToolContainer.jsx
        return {
          pattern: {},
          currentPalette: {}
        }
      default:
        return state
    }

  }

  export default patternReducer