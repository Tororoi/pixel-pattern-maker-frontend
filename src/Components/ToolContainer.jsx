import React from 'react';
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
            <Palette 
                currentColor={props.canvasInfo.currentColor}
                paletteInfo={props.paletteInfo}
                setColorDispatch={props.setColorDispatch}
            />
            <ColorPicker
                currentColor={props.canvasInfo.currentColor}
                setColorDispatch={props.setColorDispatch}
                addColorDispatch={props.addColorDispatch}
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

const mapDispatchToProps = {
    dispatchSetName: setName,
    setColorDispatch: setColor,
    addColorDispatch: addColor
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