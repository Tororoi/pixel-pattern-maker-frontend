import React, { useState } from 'react';
import {connect} from 'react-redux'

const Canvas = (props) => {
    const canvasRef = React.useRef(null)
    
    
    // const drawNine = () => {
    //     const canvas = canvasRef.current        
    //     const ctx = canvas.getContext('2d')
    //     const b = props.boxSize
    //     ctx.fillStyle = "white";
    //     ctx.fillRect(0,0,b,b) 
    //     ctx.fillRect(b*2,0,b,b) 
    //     ctx.fillRect(b,b,b,b) 
    //     ctx.fillRect(0,b*2,b,b) 
    //     ctx.fillRect(b*2,b*2,b,b) 
    //     ctx.fillStyle = 'gray';
    //     ctx.fillRect(b,0,b,b) 
    //     ctx.fillRect(0,b,b,b) 
    //     ctx.fillRect(b*2,b,b,b) 
    //     ctx.fillRect(b,b*2,b,b) 
    // }

    // const handleClick = (e) => {

    //     // implement draw on ctx here
    // }

    const handleCoords = (e) => {
        const mouseX=e.nativeEvent.offsetX;
        const mouseY=e.nativeEvent.offsetY;
        const canvas = canvasRef.current        
        const ctx = canvas.getContext('2d') 
        const w = 4
        const h = 4
        const x1 = Math.floor(mouseX/w)*w
        const y1 = Math.floor(mouseY/h)*h

        if (props.mouseDown === true) {
            ctx.fillStyle=props.currentColor
            // ctx.fillRect(x1,y1,w,h) 

            props.squares.forEach(square => {
                ctx.fillRect(x1+square.x,y1+square.y,w,h) 
                ctx.fillRect(x1-square.x,y1-square.y,w,h) 
                ctx.fillRect(x1-square.x,y1+square.y,w,h)
                ctx.fillRect(x1+square.x,y1-square.y,w,h) 
            })
        }
    }

    const downClick = (e) => {
        props.mouseDownDispatch(true)
    }

    const upClick = (e) => {
        props.mouseDownDispatch(false)
    }

    return (
        <canvas
            ref={canvasRef}
            width={768}
            height={768}
            // onMouseEnter={drawNine}
            // onClick={handleClick}
            onMouseMove={handleCoords}
            onMouseDown={downClick}
            onMouseUp={upClick}
            onMouseOut={upClick}
        />
    )
}

const setMouseState = (mouseState) => {
    return {
        type: "SET_MOUSE_STATE",
        payload: mouseState
    }
}

const setColor = (color) => {
    return {
        type: "SET_COLOR",
        payload: color
    }
}

const mapDispatchToProps = {
    mouseDownDispatch: setMouseState,
    colorDispatch: setColor
  }

export default connect(null, mapDispatchToProps)(Canvas);