import React from 'react';
import ColorPicker from './ColorPicker'
import Palette from './Palette'

import {connect} from 'react-redux'

//Parents: DrawContainer

const ToolContainer = (props) => {

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
            colors: props.paletteInfo.colors.map(c => {
                return c.hex
            })
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
            colors: props.paletteInfo.colors.map(c => {
                return c.hex
            }),
            paletteID: props.currentPalette.id
        }
        props.updatePattern(newPatternPOJO)
    }

    const startNew = (e) => {
        e.preventDefault()
        props.resetPatternStateDispatch()
        props.clearCTXDispatch(true)
        props.dispatchSetName("")
        props.setImageSizeDispatch(props.canvasInfo.newSize)
        if (!props.paletteInfo.keep) {
            props.setPaletteColorsDispatch([{number: 1, hex: "#ffffff", rData: []}])
            props.setColorDispatch({number: 1, hex: "#ffffff", rData: []})
        }
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
        //No scaling, exports as original sized image (pixel scale 1)
        //IDEA: put image onto offscreen canvas at desired scale, then use that as the export source *****
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

    // const changeZoom = (e) => {
    //     props.zoomDispatch(e.target.innerText)
    // }

    const changeTool = (e) => {
        // console.log(props.userInfo.user.id)
        // console.log(props.currentPattern.user_id)
        props.toolDispatch(e.target.value)
    }

    const changeSize = (e) => {
        props.setNewSizeDispatch(parseInt(e.target.value))
    }

    const changeKeepPalette = (e) => {
        props.keepPaletteDispatch()
    }

    return (
        <>
            <form className="title-input">
                <label>
                    Title:
                    <input type="text" value={props.canvasInfo.currentName} onChange={setName} />
                </label>
            </form>
            <span className="crud-container" >
                <h3 className="create" onClick={createPattern} style={localStorage.token ? {display: "block"} : {display: "none"}}>Create</h3>
                <h3 className="update" onClick={updatePattern} style={props.userInfo.user.id === props.currentPattern.user_id ? {display: "block"} : {display: "none"}}>Update</h3>
                <h3 className="delete" onClick={deletePattern} style={props.userInfo.user.id === props.currentPattern.user_id ? {display: "block"} : {display: "none"}}>Delete</h3>
            </span>
            <span className="export-container">
                <h3 onClick={exportImage}>Export Image</h3>
                <h3 onClick={props.undoDispatch}>Undo</h3>
            </span>
            {/* <div className="BG-container">
                    <label htmlFor="box-size">Zoom</label>
                    <div className="setBG" onClick={changeZoom}>
                        <label className="bg-swatch" style={{border: "4px solid black", margin: "0px", backgroundColor: "red"}}>
                            +
                        </label>
                        <label className="bg-swatch" style={{border: "4px solid black", margin: "0px", backgroundColor: "blue"}}>
                            -
                        </label>
                    </div>
            </div> */}
            <span className="tool-container">
                <div className="tools" onChange={changeTool}>
                    <label className="tool" style={props.canvasInfo.tool === "pencil" ? {border: "4px solid black", margin: "0px", background: "url(https://i.imgur.com/dqP3kPw.png), rgb(143, 207, 145)", WebkitFilter: "grayscale(0%)"} : {background: "url(https://i.imgur.com/dqP3kPw.png), gray"}}>
                        <input type="radio" value="pencil" checked={props.canvasInfo.tool === "pencil"}/>
                    </label>
                    <label className="tool" style={props.canvasInfo.tool === "eraser" ? {border: "4px solid black", margin: "0px", background: "url(https://i.imgur.com/0FJeZYK.png), rgb(143, 207, 145)", WebkitFilter: "grayscale(0%)"} : {background: "url(https://i.imgur.com/0FJeZYK.png), gray"}}>
                        <input type="radio" value="eraser" checked={props.canvasInfo.tool === "eraser"}/>
                    </label>
                    <label className="tool" style={props.canvasInfo.tool === "drag" ? {border: "4px solid black", margin: "0px", background: "url(https://i.imgur.com/61n4tTU.png), rgb(143, 207, 145)", WebkitFilter: "grayscale(0%)"} : {background: "url(https://i.imgur.com/61n4tTU.png), gray"}}>
                        <input type="radio" value="drag" checked={props.canvasInfo.tool === "drag"}/>
                    </label>
                </div>
            </span>
            <Palette 
                currentColor={props.canvasInfo.currentColor}
                paletteInfo={props.paletteInfo}
                setColorDispatch={props.setColorDispatch}
                addColorDispatch={props.addColorDispatch}
                allowReplaceDispatch={props.allowReplaceDispatch}
            />
            <ColorPicker
                canvasInfo={props.canvasInfo}
                paletteInfo={props.paletteInfo}
                setColorDispatch={props.setColorDispatch}
                updateColorDispatch={props.updateColorDispatch}
                pickerDispatch={props.pickerDispatch}
                pickerMouseDownDispatch={props.pickerMouseDownDispatch}
                currentImageDispatch={props.currentImageDispatch}
                toolDispatch={props.toolDispatch}
                replacingDispatch={props.replacingDispatch}
            />
            <div className="settings">
                <div className="BG-container">
                    <label htmlFor="backgrounds">Background</label>
                    <div className="setBG" onChange={changeBG}>
                        <label className="bg-swatch" style={props.canvasInfo.background === "white" ? {border: "4px solid black", margin: "0px", backgroundColor: "white"} : {backgroundColor: "white"}}>
                            <input type="radio" value="white" checked={props.canvasInfo.background === "white"}/>
                        </label>
                        <label className="bg-swatch" style={props.canvasInfo.background === "gray" ? {border: "4px solid black", margin: "0px", backgroundColor: "gray"} : {backgroundColor: "gray"}}>
                            <input type="radio" value="gray" checked={props.canvasInfo.background === "gray"}/>
                        </label>
                        <label className="bg-swatch" style={props.canvasInfo.background === "black" ? {border: "4px solid black", margin: "0px", backgroundColor: "black"} : {backgroundColor: "black"}}>
                            <input type="radio" value="black" checked={props.canvasInfo.background === "black"}/>
                        </label>
                        <label className="bg-swatch" style={props.canvasInfo.background === "transparent" ? {border: "4px solid black", margin: "0px", background: "url(https://i.imgur.com/Veq5bJY.png), rgb(199, 207, 230)"} : {background: "url(https://i.imgur.com/Veq5bJY.png), rgb(199, 207, 230)"}}>
                            <input type="radio" value="transparent" checked={props.canvasInfo.background === "transparent"}/>
                        </label>
                    </div>
                </div>
                <div className="start-new">
                    <label className="keep-palette" >
                        <input type="checkbox" value={props.paletteInfo.keep} checked={props.paletteInfo.keep} onChange={changeKeepPalette}/>
                        <p>Keep Palette?</p>
                    </label>
                    <div value={props.canvasInfo.newSize} onChange={changeSize} className="sizes">
                        <div className="size-card">
                        <label className="sixty-four" style={props.canvasInfo.newSize === 64 ? {border: "4px solid black", margin: "-2px", backgroundColor: "rgb(143, 207, 145)"} : {}}>
                            <input type="radio" value="64" checked={props.canvasInfo.newSize === 64}/>
                        </label>
                        <p>64x64</p>
                        </div>
                        <div className="size-card">
                        <label className="thirty-two" style={props.canvasInfo.newSize === 32 ? {border: "4px solid black", margin: "-2px", backgroundColor: "rgb(143, 207, 145)"} : {}}>
                            <input type="radio" value="32" checked={props.canvasInfo.newSize === 32}/>
                        </label>
                        <p>32x32</p>
                        </div>
                        <div className="size-card">
                        <label className="sixteen" style={props.canvasInfo.newSize === 16 ? {border: "4px solid black", margin: "-2px", backgroundColor: "rgb(143, 207, 145)"} : {}}>
                            <input type="radio" value="16" checked={props.canvasInfo.newSize === 16}/>
                        </label>
                        <p>16x16</p>
                        </div>
                    </div>
                    <input type="submit" value="Start New" onClick={startNew}/>
                </div>
            </div>
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

const keepPalette = () => {
    return {
        type: "KEEP_PALETTE"
    }
}

const resetPatternState = () => {
    return {
      type: "RESET_PATTERN_STATE"
    }
  }

const setBoxSize = (plusminus) => {
    return {
        type: "SET_BOX_SIZE",
        payload: plusminus
    }
}

const undoButton = () => {
    return {
        type: "UNDO",
        payload: "no payload necesssary"
    }
}

const mapDispatchToProps = {
    dispatchSetName: setName,
    setImageSizeDispatch: setImageSize,
    setNewSizeDispatch: setNewSize,
    addColorDispatch: addColor,
    updateColorDispatch: updateColor,
    toolDispatch: setTool,
    setBGDispatch: setBG,
    pickerDispatch: hoverPicker,
    keepPaletteDispatch: keepPalette,
    resetPatternStateDispatch: resetPatternState,
    zoomDispatch: setBoxSize,
    undoDispatch: undoButton
}

// the return value of mapStateToProps is an object that will be merged into DrawContainer's props
let mapStateToProps = (reduxState) => {
  return {
    canvasInfo: reduxState.canvasInfo,
    paletteInfo: reduxState.paletteInfo,
    currentPattern: reduxState.currentPatternInfo.pattern,
    currentPalette: reduxState.currentPatternInfo.currentPalette,
    userInfo: reduxState.userInfo
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ToolContainer)