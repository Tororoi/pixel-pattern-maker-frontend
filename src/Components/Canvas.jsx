import React from 'react';
import {connect} from 'react-redux'

//Parents: DrawContainer

class Canvas extends React.Component {
    canvasRef = React.createRef();

    componentDidMount() {
        this.renderInitialCanvas()
        this.props.setCanvasDispatch(this.canvasRef.current)
        this.props.setColorDispatch(this.props.paletteInfo.colors[0])
        this.props.allowReplaceDispatch(true)
    }

    componentDidUpdate() {
        const cvs = this.canvasRef.current  
        const ctx = cvs.getContext('2d')
        //changed size of canvas
        if (this.props.canvasInfo.sizeChanged) {
            this.renderCanvas()
            this.props.sizeChangedDispatch(false)
        }
        //change background color
        if (this.props.canvasInfo.allowBGChange === true) {
            cvs.style.backgroundColor = this.props.canvasInfo.background;
            this.props.allowBGChangeDispatch(false)
        }
        //clear canvas when button is pressed
        if (this.props.canvasInfo.ctxClear === true) {
            ctx.clearRect(0,0,this.props.canvasInfo.boxSize*3,this.props.canvasInfo.boxSize*3)
            this.props.clearCTXDispatch(false)
        }
        // change old color to new color
        const replaceColor = () => {
            //create offscreen canvas with image to reduce size of array to iterate over.
            let offScreenCanvas = document.createElement('canvas');
            offScreenCanvas.width = this.props.canvasInfo.imageSize;
            offScreenCanvas.height = this.props.canvasInfo.imageSize;
            const offScreenCtx = offScreenCanvas.getContext('2d');
            //draw the image onto the offscreen canvas at pixel scale 1.
            offScreenCtx.drawImage(this.canvasRef.current,0,0,this.props.canvasInfo.boxSize,this.props.canvasInfo.boxSize,0,0,this.props.canvasInfo.imageSize,this.props.canvasInfo.imageSize); 
            //get the image data off the smaller, offscreen image.
            const imageData = offScreenCtx.getImageData(0,0,this.props.canvasInfo.imageSize,this.props.canvasInfo.imageSize)

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

            //get current color in RGB format
            const currentRGB = hexToRgb(this.props.canvasInfo.currentColor.hex)
            //iterate through pixels and replace color data
            for (let i=0;i<imageData.data.length;i+=4) {
                if (rgbToHex(imageData.data[i],imageData.data[i+1],imageData.data[i+2]) === this.props.canvasInfo.oldColor.hex) {
                    imageData.data[i]=currentRGB.r;
                    imageData.data[i+1]=currentRGB.g;
                    imageData.data[i+2]=currentRGB.b;
                }
            }

            //put the altered data back on the offscreen canvas
            offScreenCtx.putImageData(imageData,0,0);
            //clear the main canvas
            ctx.clearRect(0,0,this.props.canvasInfo.boxSize*3,this.props.canvasInfo.boxSize*3)
            //restate imageSmoothing to prevent rare bug where image is rendered blurry
            ctx.imageSmoothingEnabled = false;
            //draw onto the main canvas
            const b = this.props.canvasInfo.boxSize
            const squares = [{x: 0,y: 0},{x: b,y: 0},{x: b*2,y: 0},{x: 0,y: b},{x: b,y: b},{x: b*2,y: b},{x: 0,y: b*2},{x: b,y: b*2},{x: b*2,y: b*2}]
            squares.forEach(square => {
                ctx.drawImage(offScreenCanvas,square.x,square.y,b,b)
            })
            //After replacing color, disable replacement until the color is changed again.
            this.props.replacingDispatch(false)
        }

        if (this.props.canvasInfo.replacing === true && this.props.canvasInfo.replacementAllowed === true) {replaceColor()}
        //Make object that allows access to indexes of pixels that need to be changed --- how?
        
    }

    renderCanvas = () => {
        //renders the initial canvas
        const cvs = this.canvasRef.current        
        const ctx = cvs.getContext('2d')
        cvs.width = this.props.canvasInfo.boxSize*3
        cvs.height = this.props.canvasInfo.boxSize*3
        cvs.style.backgroundColor = this.props.canvasInfo.background;
        ctx.imageSmoothingEnabled = false;
        const b = this.props.canvasInfo.boxSize
        const squares = [{x: 0,y: 0},{x: b,y: 0},{x: b*2,y: 0},{x: 0,y: b},{x: b,y: b},{x: b*2,y: b},{x: 0,y: b*2},{x: b,y: b*2},{x: b*2,y: b*2}]
        const image = new Image();
        // image.src = this.props.currentPattern.image
        image.src = this.props.canvasInfo.currentImage

        // if (this.props.canvasInfo.currentImage) {
            squares.forEach((s) => {
                ctx.drawImage(image,s.x,s.y,this.props.canvasInfo.boxSize,this.props.canvasInfo.boxSize)
            })

            let offscreenCanvas = document.createElement('canvas');
            offscreenCanvas.width = this.props.canvasInfo.imageSize;
            offscreenCanvas.height = this.props.canvasInfo.imageSize;
            offscreenCanvas.getContext('2d').drawImage(this.canvasRef.current,0,0,this.props.canvasInfo.boxSize,this.props.canvasInfo.boxSize,0,0,this.props.canvasInfo.imageSize,this.props.canvasInfo.imageSize);
            const realImage = offscreenCanvas.toDataURL()

            console.log(realImage, this.props.canvasInfo.currentImage, image.src) //*****/
            if (realImage !== this.props.canvasInfo.currentImage) {
                console.log("but why?")
                squares.forEach((s) => {
                    console.log(image.src) //*****/
                    ctx.drawImage(image,s.x,s.y,this.props.canvasInfo.boxSize,this.props.canvasInfo.boxSize)
                })
            }
            console.log(cvs.toDataURL()) //*****/
    }

    renderInitialCanvas = () => {
        //renders the initial canvas
        const cvs = this.canvasRef.current        
        const ctx = cvs.getContext('2d')
        cvs.width = this.props.canvasInfo.boxSize*3
        cvs.height = this.props.canvasInfo.boxSize*3
        cvs.style.backgroundColor = this.props.canvasInfo.background;
        ctx.imageSmoothingEnabled = false;
        const b = this.props.canvasInfo.boxSize
        const squares = [{x: 0,y: 0},{x: b,y: 0},{x: b*2,y: 0},{x: 0,y: b},{x: b,y: b},{x: b*2,y: b},{x: 0,y: b*2},{x: b,y: b*2},{x: b*2,y: b*2}]
        const image = new Image();
        // image.src = this.props.currentPattern.image
        image.src = this.props.canvasInfo.currentImage
        
        squares.forEach((s) => {
            ctx.drawImage(image,s.x,s.y,this.props.canvasInfo.boxSize,this.props.canvasInfo.boxSize)
        })
    }

    imageToReduxState = (e) => {
        //pushes a minimum size version of the canvas image to the redux state
        let offscreenCanvas = document.createElement('canvas');
        offscreenCanvas.width = this.props.canvasInfo.imageSize; //pixel scale 1. ***** Add a multiplier to export form. *****
        offscreenCanvas.height = this.props.canvasInfo.imageSize;
        offscreenCanvas.getContext('2d').drawImage(this.canvasRef.current,0,0,this.props.canvasInfo.boxSize,this.props.canvasInfo.boxSize,0,0,this.props.canvasInfo.imageSize,this.props.canvasInfo.imageSize); // first four coords are the cropping area
        this.props.currentImageDispatch(offscreenCanvas.toDataURL()) //gets canceled out by componentDidMount

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

const allowBGChange = (boolean) => {
    return {
        type: "ALLOW_BG_CHANGE",
        payload: boolean
    }
}

const sizeChanged = (boolean) => {
    return {
        type: "SIZE_CHANGED",
        payload: boolean
    }
}

const mapDispatchToProps = {
    mouseDownDispatch: setMouseState,
    setCanvasDispatch: setCanvas,
    allowBGChangeDispatch: allowBGChange,
    sizeChangedDispatch: sizeChanged
  }

export default connect(null, mapDispatchToProps)(Canvas);