import React from 'react';
import {connect} from 'react-redux'

const Canvas = (props) => {
    const canvasRef = React.useRef(null)

    const renderPattern = (e) => {
        console.log("rendered Pattern")
        const canvas = canvasRef.current        
        const ctx = canvas.getContext('2d') 
        const image = new Image();
        image.src = props.currentPattern.image

        if (props.currentPattern.image) {
            props.canvasInfo.squares.forEach((s) => {
                ctx.drawImage(image,s.x,s.y)
            })
        }
        // ctx.drawImage(props.canvasInfo.currentImage,0,0)
    }

    const handleClick = (e) => {
        var cvs = document.createElement('canvas');
        cvs.width = 256;
        cvs.height = 256;
        cvs.getContext('2d').drawImage(canvasRef.current,0,0,256,256,0,0,256, 256); // first four coords are the cropping area
        props.currentImageDispatch(cvs.toDataURL())

        // props.savePattern(canvasRef.current.toDataURL())
        // implement draw on ctx here
    }

    const handleCoords = (e) => {
        const mouseX=e.nativeEvent.offsetX;
        const mouseY=e.nativeEvent.offsetY;
        const canvas = canvasRef.current        
        const ctx = canvas.getContext('2d') 
        const w = 4
        const h = 4
        const x1 = Math.floor(mouseX/w)*w
        const y1 = Math.floor(mouseY/h)*h

        if (props.canvasInfo.mouseDown === true) {
            ctx.fillStyle=props.canvasInfo.currentColor
            // ctx.fillRect(x1,y1,w,h) 

            props.canvasInfo.squares.forEach(square => {
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
            onMouseEnter={renderPattern}
            onClick={handleClick}
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

const setImage = (image) => {
    return {
        type: "SET_IMAGE",
        payload: image
    }
}

const mapDispatchToProps = {
    mouseDownDispatch: setMouseState,
    currentImageDispatch: setImage
  }

export default connect(null, mapDispatchToProps)(Canvas);