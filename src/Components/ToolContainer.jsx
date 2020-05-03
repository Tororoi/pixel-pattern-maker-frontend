import React, { createContext } from 'react';
import ColorPicker from './ColorPicker'
import Palette from './Palette'

import {connect} from 'react-redux'

//Parents: DrawContainer

const ToolContainer = (props) => {
//   console.log("PROPS OF CONTAINER", props.dispatchSetName )

    // const initName = (e) => {
    //     props.dispatchSetName(props.currentPattern.name)
    // }

    const setName = (e) => {
        props.dispatchSetName(e.target.value)
    }

    const createPattern = (e) => {
        let newPatternPOJO = {
            pattern: {
                name: props.canvasInfo.currentName, 
                image: props.canvasInfo.currentImage,
                size: props.canvasInfo.imageSize
            },
            colors: props.paletteInfo.colors
        }
        props.createPattern(newPatternPOJO)
    }

    const updatePattern = (e) => {
        let newPatternPOJO = {
            pattern: {
                id: props.currentPattern.id,
                name: props.canvasInfo.currentName, 
                image: props.canvasInfo.currentImage,
                size: props.canvasInfo.imageSize
            },
            colors: props.paletteInfo.colors,
            paletteID: props.currentPalette.id
        }
        props.updatePattern(newPatternPOJO)
    }

    const startNew = (e) => {
        e.preventDefault()
        props.resetPatternStateDispatch()
        props.setPaletteColorsDispatch(["#ffffff"])
        props.clearCTXDispatch(true)
        props.setColorDispatch("#ffffff")
        props.setImageSizeDispatch(props.canvasInfo.newSize)
    }

    const exportImage = (e) => {
        //Method 1 - currently does not work
        // const scaledImage = (source, scale) => {
        //     // create an off-screen canvas, set the size and return a new image
        //     // const img = new Image();
        //     // img.src = source
        //     const d = 64*scale
        //     const canvas = document.createElement('canvas'),
        //     ctx = canvas.getContext('2d');
        //     canvas.width = d;
        //     canvas.height = d;
        //     // draw source image into the off-screen canvas:
        //     ctx.drawImage(source, 0, 0, d, d);
        //     // encode image to data-uri with base64 version of compressed image
        //     return canvas.toDataURL();
        // }
        // const imageForExport = scaledImage(props.canvasInfo.currentImage, 4)
        // let win = window.open("")
        // win.document.write(`<img style="image-rendering: pixelated;" src=${imageForExport}>`)

        //Method 2
        // const image = new Image(512,512);
        // image.style="image-rendering: pixelated;"
        // image.src = props.canvasInfo.currentImage
        // let win = window.open("")
        // win.document.body.appendChild(image)

        //Method 3
        let win = window.open("")
        win.document.write(`<img style="image-rendering: pixelated; width: 512px; height: 512px;" src=${props.canvasInfo.currentImage}>`)
    }

    const deletePattern = (e) => {
        // console.log(props.currentPattern)
        props.deletePattern(props.currentPattern)
    }

    const changeBG = (e) => {
        props.setBGDispatch(e.target.value)
    }

    const changeTool = (e) => {
        props.toolDispatch(e.target.value)
    }

    const changeSize = (e) => {
        props.setNewSizeDispatch(parseInt(e.target.value))
    }

    return (
        <>
            <h2>Toolbox</h2>
            <form >
                <label>
                    Name:
                    <input type="text" value={props.canvasInfo.currentName} onChange={setName} />
                </label>
            </form>
            <h3 onClick={createPattern}>Create</h3>
            <h3 onClick={updatePattern}>Update</h3>
            <h3 onClick={deletePattern}>Delete</h3>
            <div className="setBG" onChange={changeBG}>
                <label htmlFor="white" >
                    <input type="radio" value="white" checked={props.canvasInfo.background === "white"}/>White
                </label>
                <label htmlFor="gray" >
                    <input type="radio" value="gray" checked={props.canvasInfo.background === "gray"}/>Gray
                </label>
                <label htmlFor="black" >
                    <input type="radio" value="black" checked={props.canvasInfo.background === "black"}/>Black
                </label>
                <label htmlFor="transparent" >
                    <input type="radio" value="transparent" checked={props.canvasInfo.background === "transparent"}/>Transparent
                </label>
            </div>
            <div className="tools" onChange={changeTool}>
                <label htmlFor="pencil" >
                    <input type="radio" value="pencil" checked={props.canvasInfo.tool === "pencil"}/>Pencil
                </label>
                <label htmlFor="eraser" >
                    <input type="radio" value="eraser" checked={props.canvasInfo.tool === "eraser"}/>Eraser
                </label>
            </div>
            <div className="start-new">
                <label htmlFor="new-pattern" >Start New</label>
                <div value={props.canvasInfo.newSize} onChange={changeSize} className="form-control">
                    <label htmlFor="64x64" >
                        <input type="radio" value="64" checked={props.canvasInfo.newSize === 64}/>64x64
                    </label>
                    <label htmlFor="32x32" >
                        <input type="radio" value="32" checked={props.canvasInfo.newSize === 32}/>32x32
                    </label>
                    <label htmlFor="16x16" >
                        <input type="radio" value="16" checked={props.canvasInfo.newSize === 16}/>16x16
                    </label>
                </div>
                <input type="submit" value="Submit" onClick={startNew}/>
            </div>
            <h3 onClick={exportImage}>Export</h3>
            <Palette 
                currentColor={props.canvasInfo.currentColor}
                paletteInfo={props.paletteInfo}
                setColorDispatch={props.setColorDispatch}
                addColorDispatch={props.addColorDispatch}
            />
            <ColorPicker
                canvasInfo={props.canvasInfo}
                paletteInfo={props.paletteInfo}
                setColorDispatch={props.setColorDispatch}
                addColorDispatch={props.addColorDispatch}
                updateColorDispatch={props.updateColorDispatch}
                pickerDispatch={props.pickerDispatch}
                pickerClickDispatch={props.pickerClickDispatch}
                currentImageDispatch={props.currentImageDispatch}
            />
        </>
    )
};

const setName = (name) => {
    return {
        type: "SET_NAME",
        payload: name
    }
}

const setImageSize = (size) => {
    return {
        type: "SET_IMAGE_SIZE",
        payload: size
    }
}

const setNewSize = (size) => {
    return {
        type: "SET_NEW_SIZE",
        payload: size
    }
}

const setColor = (color) => {
    return {
        type: "SET_COLOR",
        payload: color
    }
}

const addColor = (color) => {
    return {
        type: "ADD_COLOR",
        payload: color
    }
}

const updateColor = (color) => {
    return {
        type: "UPDATE_COLOR",
        payload: color
    }
}

const setBG = (color) => {
    return {
        type: "SET_BACKGROUND",
        payload: color
    }
}

const setTool = (tool) => {
    return {
        type: "SET_TOOL",
        payload: tool
    }
}

const hoverPicker = (bool) => {
    return {
        type: "HOVER_PICKER",
        payload: bool
    }
}

const pickerMouseDown = (bool) => {
    return {
        type: "PICKER_MOUSE_DOWN",
        payload: bool
    }
}

const mapDispatchToProps = {
    dispatchSetName: setName,
    setImageSizeDispatch: setImageSize,
    setNewSizeDispatch: setNewSize,
    setColorDispatch: setColor,
    addColorDispatch: addColor,
    updateColorDispatch: updateColor,
    toolDispatch: setTool,
    setBGDispatch: setBG,
    pickerDispatch: hoverPicker,
    pickerClickDispatch: pickerMouseDown
}

// the return value of mapStateToProps is an object that will be merged into DrawContainer's props
let mapStateToProps = (reduxState) => {
  return {
    canvasInfo: reduxState.canvasInfo,
    paletteInfo: reduxState.paletteInfo,
    currentPattern: reduxState.currentPatternInfo.pattern,
    currentPalette: reduxState.currentPatternInfo.currentPalette
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ToolContainer)