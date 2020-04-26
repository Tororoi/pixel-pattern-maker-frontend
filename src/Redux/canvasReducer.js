let canvasInitialState = {
    mouseDown: false,
    boxSize: 256,
    currentColor: '#03396c',
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
                color: newColor
            }
        default:
            return state
    }
}

export default canvasReducer