let paletteInitialState = {
    colors: ['#FFFFFF']
}

let paletteReducer = (state = paletteInitialState, action) => {
    
    switch (action.type) {

        case "SET_PALETTE_COLORS":

            let newPalette = action.payload
            return {
                ...state,
                colors: newPalette
            }
        case "ADD_COLOR":

            let newColor = action.payload
            return {
                ...state,
                colors: [...state.colors, newColor]
            }
        case "UPDATE_COLOR":
            //don't change color but change which color belongs to palette
            let colorInfoPOJO = action.payload
            function checkColor(color) {
              return color === colorInfoPOJO['oldColor']
            }
            let oldColor = state.colors.find(checkColor)
            let colorIndex = state.colors.indexOf(oldColor)
            let updatedColorsArray = [...state.colors]
            updatedColorsArray[colorIndex] = colorInfoPOJO['newColor']

            // console.log(colorInfoPOJO['oldColor'])
            // return state
            return {
                ...state,
                colors: updatedColorsArray
            }
        default:
            return state
    }
}

export default paletteReducer