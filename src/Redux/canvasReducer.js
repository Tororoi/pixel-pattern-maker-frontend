let canvasInitialState = {
    currentName: '',
    currentImage: '',
    tool: 'pencil',
    ctxClear: false,
    mouseDown: false,
    boxSize: 256,
    currentColor: '#ffffff',
    oldColor: '#ffffff',
    squares: [
        {
            x: 0,
            y: 0
        },
        {
            x: 256,
            y: 0
        },
        {
            x: 512,
            y: 0
        },
        {
            x: 0,
            y: 256
        },
        {
            x: 256,
            y: 256
        },
        {
            x: 512,
            y: 256
        },
        {
            x: 0,
            y: 512
        },
        {
            x: 256,
            y: 512
        },
        {
            x: 512,
            y: 512
        }
    ]
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
        default:
            return state
    }
}

export default canvasReducer