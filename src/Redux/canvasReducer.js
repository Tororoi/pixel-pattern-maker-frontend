let canvasInitialState = {
    currentName: '',
    currentImage: '',
    tool: 'pencil',
    canvas: '',
    ctxClear: false,
    mouseDown: false,
    pixelScale: 1,
    imageSize: 64,
    newSize: 64,
    boxSize: 256,
    background: "white",
    currentColor: {number: 1, hex: "#ffffff", rData: []},
    oldColor: {number: 1, hex: "#ffffff", rData: []},
    replacing: false,
    replacementAllowed: true
}

let canvasReducer = (state = canvasInitialState, action) => {
    
    switch (action.type) {
        case "SET_NAME":
            let newName = action.payload
            return {
                ...state,
                currentName: newName
            }

        case "SET_IMAGE":
            let newImage = action.payload
            return {
                ...state,
                currentImage: newImage
            }

        case "SET_IMAGE_SIZE":
            let newImageSize = action.payload
            return {
                ...state,
                imageSize: newImageSize,
                newSize: newImageSize
            }

        case "SET_NEW_SIZE":
            let newNewSize = action.payload
            return {
                ...state,
                newSize: newNewSize
            }

        case "SET_MOUSE_STATE":
            let newMouseState = action.payload
            return {
                ...state,
                mouseDown: newMouseState
            }
        case "SET_COLOR":
            let newColor = action.payload
            //set state.currentColor to a new object for clearer assignment. 
            //***Fixes bug where oldColor would sometimes be set incorrectly if set after currentColor was already set to newColor***//
            let previousColor = Object.assign({}, state.currentColor)
            return {
                ...state,
                oldColor: previousColor,
                currentColor: newColor
            }
        case "SET_BACKGROUND":
            let newBackground = action.payload
            return {
                ...state,
                background: newBackground
            }
        case "SET_TOOL":
            let newTool = action.payload
            return {
                ...state,
                tool: newTool
            }
        case "CLEAR_CONTEXT":
            let clearBoolean = action.payload
            return {
                ...state,
                ctxClear: clearBoolean
            }
        case "SET_CANVAS":
            let newCanvas = action.payload
            return {
                ...state,
                canvas: newCanvas
            }
        case "REPLACING":
            return {
                ...state,
                replacing: action.payload
            }
        case "ALLOW_REPLACEMENT":
            return {
                ...state,
                replacementAllowed: action.payload
            }
        default:
            return state
    }
}

export default canvasReducer