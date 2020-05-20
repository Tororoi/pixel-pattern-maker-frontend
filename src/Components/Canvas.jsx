import React from 'react';
import {connect} from 'react-redux'

//Parents: DrawContainer

class Canvas extends React.Component {
    canvasRef = React.createRef();

    componentDidMount() {
        this.renderCanvas()
        this.props.setCanvasDispatch(this.canvasRef.current)
        this.props.setColorDispatch(this.props.paletteInfo.colors[0])
        this.props.allowReplaceDispatch(true)
    }

    componentDidUpdate() {
        const canvas = this.canvasRef.current  
        const ctx = canvas.getContext('2d')
        switch(this.props.canvasInfo.background) {
            case "white":
                canvas.style.backgroundColor = "white"
                break;
            case "gray":
                canvas.style.backgroundColor = "gray"
                break;
            case "black":
                canvas.style.backgroundColor = "black"
                break;
            case "transparent":
                canvas.style.backgroundColor = "transparent"
                break;
            default:
                canvas.style.backgroundColor = "white"
        }

        if (this.props.canvasInfo.ctxClear === true) {
            ctx.clearRect(0,0,768,768)
            this.props.clearCTXDispatch(false)
        }
        // change old color to new color
        const replaceColor = () => {
            //crate offscreen canvas with image to reduce size of array to iterate over.
            let cvs = document.createElement('canvas');
            cvs.width = this.props.canvasInfo.imageSize;
            cvs.height = this.props.canvasInfo.imageSize;
            const context = cvs.getContext('2d')
            context.drawImage(this.canvasRef.current,0,0,256,256,0,0,this.props.canvasInfo.imageSize,this.props.canvasInfo.imageSize); // first four coords are the cropping area

            const imageData = context.getImageData(0,0,this.props.canvasInfo.imageSize,this.props.canvasInfo.imageSize)

            //color format helper functions
            const componentToHex = (c) => {
                var hex = c.toString(16);
                return hex.length === 1 ? "0" + hex : hex;
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

            //iterate through pixels and replace color data
            const currentRGB = hexToRgb(this.props.canvasInfo.currentColor.hex)

            for (let i=0;i<imageData.data.length;i+=4) {
                if (rgbToHex(imageData.data[i],imageData.data[i+1],imageData.data[i+2]) === this.props.canvasInfo.oldColor.hex) {
                    imageData.data[i]=currentRGB.r;
                    imageData.data[i+1]=currentRGB.g;
                    imageData.data[i+2]=currentRGB.b;
                }
            }

            // put the altered data back on the canvas  
            context.putImageData(imageData,0,0);
            // clear main canvas
            ctx.clearRect(0,0,768,768)
            // restate imageSmoothing to prevent rare bug where image is rendered blurry
            ctx.imageSmoothingEnabled = false;
            //draw onto the main canvas
            const b = this.props.canvasInfo.boxSize
            const squares = [{x: 0,y: 0},{x: b,y: 0},{x: b*2,y: 0},{x: 0,y: b},{x: b,y: b},{x: b*2,y: b},{x: 0,y: b*2},{x: b,y: b*2},{x: b*2,y: b*2}]
            squares.forEach(square => {
                ctx.drawImage(cvs,square.x,square.y,b,b)
            })
            this.props.replacingDispatch(false)
        }

        if (this.props.canvasInfo.replacing === true && this.props.canvasInfo.replacementAllowed === true) {replaceColor()}
        // if (this.props.paletteInfo.pickerMouseDown) {replaceColor()}
        //Make object that allows access to indexes of pixels that need to be changed --- how?
        //iterate through image data of a version of canvas at pixel scale 1 to reduce strain from function

        // const imageData = ctx.getImageData(0,0,64,64)
        // console.log(imageData)
    }

    renderCanvas = () => {
        const canvas = this.canvasRef.current        
        const ctx = canvas.getContext('2d')
        ctx.imageSmoothingEnabled = false;
        const b = this.props.canvasInfo.boxSize
        const squares = [{x: 0,y: 0},{x: b,y: 0},{x: b*2,y: 0},{x: 0,y: b},{x: b,y: b},{x: b*2,y: b},{x: 0,y: b*2},{x: b,y: b*2},{x: b*2,y: b*2}]
        const image = new Image();
        image.src = this.props.currentPattern.image

        if (this.props.currentPattern.image) {
            squares.forEach((s) => {
                ctx.drawImage(image,s.x,s.y,256,256)
            })
            // this.props.setPaletteColorsDispatch(this.props.paletteInfo.colors)
        }
        this.props.currentImageDispatch(this.props.currentPattern.image)
    }

    imageToReduxState = (e) => {
        let cvs = document.createElement('canvas');
        cvs.width = this.props.canvasInfo.imageSize; //pixel scale 1. Add a multiplier to export form.
        cvs.height = this.props.canvasInfo.imageSize;
        cvs.getContext('2d').drawImage(this.canvasRef.current,0,0,256,256,0,0,this.props.canvasInfo.imageSize,this.props.canvasInfo.imageSize); // first four coords are the cropping area
        this.props.currentImageDispatch(cvs.toDataURL()) //gets canceled out by componentDidMount

        // if (!localStorage.token) {localStorage.image = cvs.toDataURL()}
    }

    handleMouseMove = (e) => {
        const mouseX=e.nativeEvent.offsetX;
        const mouseY=e.nativeEvent.offsetY;
        const canvas = this.canvasRef.current        
        const ctx = canvas.getContext('2d') 
        const pixelSize = this.props.canvasInfo.boxSize/this.props.canvasInfo.imageSize
        const x1 = Math.floor(mouseX/pixelSize)*pixelSize
        const y1 = Math.floor(mouseY/pixelSize)*pixelSize
        const b = this.props.canvasInfo.boxSize
        const squares = [{x: 0,y: 0},{x: b,y: 0},{x: b*2,y: 0},{x: 0,y: b},{x: b,y: b},{x: b*2,y: b},{x: 0,y: b*2},{x: b,y: b*2},{x: b*2,y: b*2}]

        if (this.props.canvasInfo.mouseDown === true) {
            ctx.fillStyle=this.props.canvasInfo.currentColor.hex
            
            switch(this.props.canvasInfo.tool) {
                case 'pencil':
                    squares.forEach(square => {
                        ctx.fillRect(x1+square.x,y1+square.y,pixelSize,pixelSize) 
                        ctx.fillRect(x1-square.x,y1-square.y,pixelSize,pixelSize) 
                        ctx.fillRect(x1-square.x,y1+square.y,pixelSize,pixelSize)
                        ctx.fillRect(x1+square.x,y1-square.y,pixelSize,pixelSize) 
                    })
                    break;
                case 'eraser':
                    squares.forEach(square => {
                        ctx.clearRect(x1+square.x,y1+square.y,pixelSize,pixelSize) 
                        ctx.clearRect(x1-square.x,y1-square.y,pixelSize,pixelSize) 
                        ctx.clearRect(x1-square.x,y1+square.y,pixelSize,pixelSize)
                        ctx.clearRect(x1+square.x,y1-square.y,pixelSize,pixelSize) 
                    })
                    break;
                default:
                    break;
            }


        }
    }

    handleMouseDown = (e) => {
        this.props.mouseDownDispatch(true)
        //add action that sets replacement allowed to true
        this.props.allowReplaceDispatch(true)

        //repeat of draw function. needed here to get pixel drawn even if mouse doesn't move
        const mouseX=e.nativeEvent.offsetX;
        const mouseY=e.nativeEvent.offsetY;
        const canvas = this.canvasRef.current        
        const ctx = canvas.getContext('2d') 
        const pixelSize = this.props.canvasInfo.boxSize/this.props.canvasInfo.imageSize
        const x1 = Math.floor(mouseX/pixelSize)*pixelSize
        const y1 = Math.floor(mouseY/pixelSize)*pixelSize
        const b = this.props.canvasInfo.boxSize
        const squares = [{x: 0,y: 0},{x: b,y: 0},{x: b*2,y: 0},{x: 0,y: b},{x: b,y: b},{x: b*2,y: b},{x: 0,y: b*2},{x: b,y: b*2},{x: b*2,y: b*2}]

        ctx.fillStyle=this.props.canvasInfo.currentColor.hex
        //only thing different is lack of conditional here
        switch(this.props.canvasInfo.tool) {
            case 'pencil':
                squares.forEach(square => {
                    ctx.fillRect(x1+square.x,y1+square.y,pixelSize,pixelSize) 
                    ctx.fillRect(x1-square.x,y1-square.y,pixelSize,pixelSize) 
                    ctx.fillRect(x1-square.x,y1+square.y,pixelSize,pixelSize)
                    ctx.fillRect(x1+square.x,y1-square.y,pixelSize,pixelSize) 
                })
                break;
            case 'eraser':
                squares.forEach(square => {
                    ctx.clearRect(x1+square.x,y1+square.y,pixelSize,pixelSize) 
                    ctx.clearRect(x1-square.x,y1-square.y,pixelSize,pixelSize) 
                    ctx.clearRect(x1-square.x,y1+square.y,pixelSize,pixelSize)
                    ctx.clearRect(x1+square.x,y1-square.y,pixelSize,pixelSize) 
                })
                break;
            default:
                break;
        }
    }

    handleMouseUp = (e) => {
        this.props.mouseDownDispatch(false)
    }

    render() {
        return (
            <canvas
                ref={this.canvasRef}
                width={768}
                height={768}
                // onMouseEnter={renderPattern}
                onClick={this.imageToReduxState}
                onMouseMove={this.handleMouseMove}
                onMouseDown={this.handleMouseDown}
                onMouseUp={this.handleMouseUp}
                onMouseOut={this.handleMouseUp}
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

const setCanvas = (canvas) => {
    return {
        type: "SET_CANVAS",
        payload: canvas
    }
}

const mapDispatchToProps = {
    mouseDownDispatch: setMouseState,
    setCanvasDispatch: setCanvas
  }

export default connect(null, mapDispatchToProps)(Canvas);