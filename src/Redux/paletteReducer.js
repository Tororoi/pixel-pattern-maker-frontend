let paletteInitialState = {
    currentColor: '#FFFFFF',
    colors: ['#FFFFFF','#FFFFFF','#FFFFFF']
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
            let updatedColor = action.payload
            return {
                ...state,
                colors: [...state.colors, updatedColor]
            }
        default:
            return state
    }
}

export default paletteReducer