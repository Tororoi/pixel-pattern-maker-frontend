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
                image: props.canvasInfo.currentImage
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
            },
            colors: props.paletteInfo.colors,
            paletteID: props.currentPalette.id
        }
        props.updatePattern(newPatternPOJO)
    }

    const startNew = (e) => {
        props.resetPatternStateDispatch()
        props.setPaletteColorsDispatch(["#FFFFFF"])
        props.clearCTXDispatch(true)
        //To do: Set canvas ref to state so this function can clear canvas
    }

    const exportImage = (e) => {
        let win = window.open("")
        win.document.write(`<img src=${props.canvasInfo.currentImage}>`)
    }

    const deletePattern = (e) => {
        // console.log(props.currentPattern)
        props.deletePattern(props.currentPattern)
    }

    const changeTool = (e) => {
        props.toolDispatch(e.target.innerText)
        Array.from(e.target.parentNode.children).forEach((c) => {c.style.color = "black"}) //temporary
        e.target.style.color="red"
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
            <h3 onClick={startNew}>New</h3>
            <h3 onClick={exportImage}>Export</h3>
            <div className="tools" onClick={changeTool}>
                <div>pencil</div>
                <div>eraser</div>
            </div>
            <Palette 
                currentColor={props.canvasInfo.currentColor}
                paletteInfo={props.paletteInfo}
                setColorDispatch={props.setColorDispatch}
                addColorDispatch={props.addColorDispatch}
            />
            <ColorPicker
                currentColor={props.canvasInfo.currentColor}
                paletteInfo={props.paletteInfo}
                setColorDispatch={props.setColorDispatch}
                addColorDispatch={props.addColorDispatch}
                updateColorDispatch={props.updateColorDispatch}
                pickerDispatch={props.pickerDispatch}
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

const mapDispatchToProps = {
    dispatchSetName: setName,
    setColorDispatch: setColor,
    addColorDispatch: addColor,
    updateColorDispatch: updateColor,
    toolDispatch: setTool,
    pickerDispatch: hoverPicker
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