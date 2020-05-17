let paletteInitialState = {
    colors: [{number: 1, hex: "#ffffff", rData: []}],
    insidePicker: false,
    pickerMouseDown: false,
    keep: false
}

let paletteReducer = (state = paletteInitialState, action) => {
    
    switch (action.type) {

        case "SET_PALETTE_COLORS":
            //Defined in App.js
            //Called from Pattern.jsx, ToolContainer.jsx
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
            //Defined in ToolContainer.jsx
            //Called from Palette.jsx
            let newColor = action.payload
            return {
                ...state,
                colors: [...state.colors, newColor]
            }
        case "UPDATE_COLOR":
            //Defined in ToolContainer.jsx
            //Called from ColorPicker.jsx
            let colorInfoPOJO = action.payload

            let colorIndex = state.colors.indexOf(colorInfoPOJO.previousColor)
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