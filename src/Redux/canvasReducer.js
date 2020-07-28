let canvasInitialState = {
    currentName: '',
    currentImage: '',
    history: [],
    undo: false,
    tool: 'pencil',
    canvas: '',
    ctxClear: false,
    mouseDown: false,
    pixelScale: 1,
    imageSize: 64,
    newSize: 64,
    boxSize: 256,
    sizeChanged: false,
    background: "white",
    allowBGChange: false,
    currentColor: {number: 1, hex: "#ffffff", rData: []},
    oldColor: {number: 1, hex: "#ffffff", rData: []},
    replacing: false,
    replacementAllowed: true
}

let canvasReducer = (state = canvasInitialState, action) => {
    
    switch (action.type) {
        case "SET_NAME":
            //Defined in ToolContainer.jsx, Pattern.jsx *****REFACTOR*****
            //Called from ToolContainer.jsx, Pattern.jsx
            let newName = action.payload
            return {
                ...state,
                currentName: newName
            }
        case "SET_IMAGE":
            //Defined in DrawContainer.jsx, Pattern.jsx *****REFACTOR*****
            //Called from Canvas.jsx, ColorPicker.jsx, Pattern.jsx
            let newImage = action.payload
            let newHistory = [...state.history, newImage]
            return {
                ...state,
                currentImage: newImage,
                history: newHistory
            }
        case "SET_IMAGE_SIZE":
            //Defined in ToolContainer.jsx, Pattern.jsx *****REFACTOR*****
            //Called from ToolContainer.jsx, Pattern.jsx
            let newImageSize = action.payload
            return {
                ...state,
                imageSize: newImageSize,
                newSize: newImageSize
            }
        case "SET_NEW_SIZE":
            //Defined in ToolContainer.jsx
            //Called from ToolContainer.jsx
            let newNewSize = action.payload
            return {
                ...state,
                newSize: newNewSize
            }
        case "SET_BOX_SIZE":
            //Must be in multiples of image size for image continuity, otherwise pixels won't always touch on canvas.
            //Defined in ToolContainer.jsx
            //Called from ToolContainer.jsx
            let newBoxSize = state.boxSize
            if (action.payload === "+" && state.boxSize < 256) {
                newBoxSize += 64
            } else if (action.payload === "-" && state.boxSize > 64) {
                newBoxSize -= 64
            }
            return {
                ...state,
                boxSize: newBoxSize,
                sizeChanged: true
            }
        case "SIZE_CHANGED":
            //Defined in Canvas.jsx
            //Called from Canvas.jsx
            return {
                ...state,
                sizeChanged: action.payload
            }
        case "SET_MOUSE_STATE":
            //Defined in Canvas.jsx
            //Called in Canvas.jsx
            let newMouseState = action.payload
            return {
                ...state,
                mouseDown: newMouseState
            }
        case "SET_COLOR":
            //Defined in DrawContainer.jsx
            //Called from Canvas.jsx, ToolContainer.jsx, Palette.jsx, ColorPicker.jsx
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
            //Defined in ToolContainer.jsx
            //Called from ToolContainer.jsx
            let newBackground = action.payload
            return {
                ...state,
                background: newBackground,
                allowBGChange: true
            }
        case "ALLOW_BG_CHANGE":
            //Defined in Canvas.jsx
            //Called from Canvas.jsx
            return {
                ...state,
                allowBGChange: action.payload
            }
        case "SET_TOOL":
            //Defined in ToolContainer.jsx
            //Called from ToolContainer.jsx, ColorPicker.jsx
            let newTool = action.payload
            return {
                ...state,
                tool: newTool
            }
        case "CLEAR_CONTEXT":
            //Defined in DrawContainer.jsx
            //Called in ToolContainer.jsx, Canvas.jsx
            let clearBoolean = action.payload
            return {
                ...state,
                ctxClear: clearBoolean
            }
        case "SET_CANVAS":
            //Defined in Canvas.jsx
            //Called in Canvas.jsx
            let newCanvas = action.payload
            return {
                ...state,
                canvas: newCanvas
            }
        case "REPLACING":
            //Defined in DrawContainer.jsx
            //Called from Canvas.jsx, ColorPicker.jsx
            return {
                ...state,
                replacing: action.payload
            }
        case "ALLOW_REPLACEMENT":
            //Defined in DrawContainer.jsx
            //Called from Canvas.jsx, Palette.jsx, Color.jsx
            return {
                ...state,
                replacementAllowed: action.payload
            }
        case "UNDO":
            //Defined in ToolContainer.jsx
            //Called from ToolContainer.jsx
            let historyCopy = [...state.history]
            historyCopy.pop()
            let prevImage = historyCopy[historyCopy.length-1]
            return {
                ...state,
                currentImage: prevImage,
                history: historyCopy,
                undo: true
            }
        case "STOP_UNDO":
            return {
                ...state,
                undo: false
            }
        default:
            return state
    }
}

export default canvasReducer