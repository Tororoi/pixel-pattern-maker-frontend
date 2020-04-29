import React from 'react';
import {connect} from 'react-redux'

class Canvas extends React.Component {
    canvasRef = React.createRef();

    componentDidMount() {
        console.log("rendered Pattern")
        const canvas = this.canvasRef.current        
        const ctx = canvas.getContext('2d') 
        const image = new Image();
        image.src = this.props.currentPattern.image

        if (this.props.currentPattern.image) {
            this.props.canvasInfo.squares.forEach((s) => {
                ctx.drawImage(image,s.x,s.y)
            })
            this.props.paletteDispatch(this.props.currentPattern.palettes[0].colors)
        }
        this.props.currentImageDispatch(this.props.currentPattern.image)
    }

    handleClick = (e) => {
        let cvs = document.createElement('canvas');
        cvs.width = 256;
        cvs.height = 256;
        cvs.getContext('2d').drawImage(this.canvasRef.current,0,0,256,256,0,0,256, 256); // first four coords are the cropping area
        this.props.currentImageDispatch(cvs.toDataURL()) //gets canceled out by componentDidMount
    }

    handleCoords = (e) => {
        const mouseX=e.nativeEvent.offsetX;
        const mouseY=e.nativeEvent.offsetY;
        const canvas = this.canvasRef.current        
        const ctx = canvas.getContext('2d') 
        const w = 4
        const h = 4
        const x1 = Math.floor(mouseX/w)*w
        const y1 = Math.floor(mouseY/h)*h

        if (this.props.canvasInfo.mouseDown === true) {
            ctx.fillStyle=this.props.canvasInfo.currentColor
            // ctx.fillRect(x1,y1,w,h) 

            this.props.canvasInfo.squares.forEach(square => {
                ctx.fillRect(x1+square.x,y1+square.y,w,h) 
                ctx.fillRect(x1-square.x,y1-square.y,w,h) 
                ctx.fillRect(x1-square.x,y1+square.y,w,h)
                ctx.fillRect(x1+square.x,y1-square.y,w,h) 
            })
        }
    }

    downClick = (e) => {
        this.props.mouseDownDispatch(true)
    }

    upClick = (e) => {
        this.props.mouseDownDispatch(false)
    }

    render() {
        return (
            <canvas
                ref={this.canvasRef}
                width={768}
                height={768}
                // onMouseEnter={renderPattern}
                onClick={this.handleClick}
                onMouseMove={this.handleCoords}
                onMouseDown={this.downClick}
                onMouseUp={this.upClick}
                onMouseOut={this.upClick}
            />
        )
    }
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

const setPalette = (colorArray) => {
    return {
        type: "SET_PALETTE_COLORS",
        payload: colorArray
    }
}

const mapDispatchToProps = {
    mouseDownDispatch: setMouseState,
    currentImageDispatch: setImage,
    paletteDispatch: setPalette
  }

export default connect(null, mapDispatchToProps)(Canvas);