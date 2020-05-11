let paletteInitialState = {
    colors: [{number: 1, hex: "#ffffff", rData: []}],
    insidePicker: false,
    pickerMouseDown: false,
    keep: false
}

let paletteReducer = (state = paletteInitialState, action) => {
    
    switch (action.type) {

        case "SET_PALETTE_COLORS":

            let newPalette = action.payload
            let i = 0
            let colorMap = newPalette.map(color => {
                //rData is the indexes of r for each pixel in the image data of the canvas
                i += 1
                return {number: i, hex: color, rData: []}
            })
            return {
                ...state,
                colors: colorMap
            }
        case "ADD_COLOR":

            let newColor = action.payload
            // let newColor = {number: state.colors.length+1, hex: newHex, rData: []}
            return {
                ...state,
                colors: [...state.colors, newColor]
            }
        case "UPDATE_COLOR":
            //don't change color but change which color belongs to palette
            let colorInfoPOJO = action.payload
            function checkColor(color) {
              return color.number === colorInfoPOJO.oldColor.number
            }
            let oldColor = state.colors.find(checkColor)
            let colorIndex = state.colors.indexOf(oldColor)
            let updatedColorsArray = [...state.colors]
            updatedColorsArray[colorIndex]['hex'] = colorInfoPOJO['newColor']

            return {
                ...state,
                colors: updatedColorsArray
            }
        case "HOVER_PICKER":

            let hoverPicker = action.payload
            return {
                ...state,
                insidePicker: hoverPicker
            }
        case "PICKER_MOUSE_DOWN":

            let newPickerMouseDown = action.payload
            return {
                ...state,
                pickerMouseDown: newPickerMouseDown
            }
        case "KEEP_PALETTE":
            return {
                ...state,
                keep: !state.keep
            }
        default:
            return state
    }
}

export default paletteReducer