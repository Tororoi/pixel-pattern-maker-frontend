import React from 'react';
import {connect} from 'react-redux'

//Parents: DrawContainer

class Canvas extends React.Component {
    canvasRef = React.createRef();

    componentDidMount() {
        this.renderCanvas()
    }

    componentDidUpdate() {
        const ctx = this.canvasRef.current.getContext('2d')
        if (this.props.canvasInfo.ctxClear === true) {
            ctx.clearRect(0,0,768,768)
            this.props.clearCTXDispatch(false)
        }
        // change old color to new color
        const replaceColor = () => {
            //get array of pixel data
            const imageData = ctx.getImageData(0,0,64,64)

            //helper functions
            const componentToHex = (c) => {
                var hex = c.toString(16);
                return hex.length == 1 ? "0" + hex : hex;
              }

            const rgbToHex = (r,g,b) => {
                return `#${componentToHex(r)}${componentToHex(g)}${componentToHex(b)}`
            }

            const hexToRgb = (hex) => {
                var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
                return result ? {
                  r: parseInt(result[1], 16),
                  g: parseInt(result[2], 16),
                  b: parseInt(result[3], 16)
                } : null;
              }

            const currentRGB = hexToRgb(this.props.canvasInfo.currentColor)

            for (let i=0;i<imageData.data.length;i+=4) {
                if (rgbToHex(imageData.data[i],imageData.data[i+1],imageData.data[i+2]) === this.props.canvasInfo.oldColor) {
                   imageData.data[i]=currentRGB.r;
                    imageData.data[i+1]=currentRGB.g;
                    imageData.data[i+2]=currentRGB.b;
                }
            }

            // put the altered data back on the canvas  
            ctx.putImageData(imageData,0,0);
        }
        // if (this.props.paletteInfo.insidePicker) {replaceColor()}
        //Make object that allows access to indexes of pixels that need to be changed --- how?
        // const imageData = ctx.getImageData(0,0,64,64)
        // console.log(imageData)
    }

    renderCanvas = () => {
        const canvas = this.canvasRef.current        
        const ctx = canvas.getContext('2d')
        const image = new Image();
        // image.src = this.props.canvasInfo.currentImage //This one has trouble, must go back twice to get it to load
        image.src = this.props.currentPattern.image
        // console.log(this.props.canvasInfo.currentImage)
        if (this.props.currentPattern.image) {
            this.props.canvasInfo.squares.forEach((s) => {
                ctx.drawImage(image,s.x,s.y)
            })
            this.props.setPaletteColorsDispatch(this.props.paletteInfo.colors)
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
            
            switch(this.props.canvasInfo.tool) {
                case 'pencil':
                    this.props.canvasInfo.squares.forEach(square => {
                        ctx.fillRect(x1+square.x,y1+square.y,w,h) 
                        ctx.fillRect(x1-square.x,y1-square.y,w,h) 
                        ctx.fillRect(x1-square.x,y1+square.y,w,h)
                        ctx.fillRect(x1+square.x,y1-square.y,w,h) 
                    })
                    break;
                case 'eraser':
                    this.props.canvasInfo.squares.forEach(square => {
                        ctx.clearRect(x1+square.x,y1+square.y,w,h) 
                        ctx.clearRect(x1-square.x,y1-square.y,w,h) 
                        ctx.clearRect(x1-square.x,y1+square.y,w,h)
                        ctx.clearRect(x1+square.x,y1-square.y,w,h) 
                    })
                    break;
                default:
                    break;
            }


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

const mapDispatchToProps = {
    mouseDownDispatch: setMouseState,
    currentImageDispatch: setImage
  }

export default connect(null, mapDispatchToProps)(Canvas);