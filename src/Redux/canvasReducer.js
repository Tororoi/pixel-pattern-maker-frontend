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
    currentColor: '#ffffff',
    oldColor: '#ffffff'
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
            return {
                ...state,
                oldColor: state.currentColor,
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
        default:
            return state
    }
}

export default canvasReducer