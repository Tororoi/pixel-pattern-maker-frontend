import React from 'react';
import ColorPicker from './ColorPicker'
import Palette from './Palette'

import {connect} from 'react-redux'


const ToolContainer = (props) => {
//   console.log("PROPS OF CONTAINER", props.dispatchSetName )

    const setName = (e) => {
        props.dispatchSetName(e.target.value)
    }

    const createPattern = (e) => {
        e.preventDefault()
        let newPatternPOJO = {
            pattern: {
                name: props.canvasInfo.currentName, 
                image: props.canvasInfo.currentImage
            },
            colors: props.paletteInfo.colors
        }
        props.savePattern(newPatternPOJO)
    }

    const startNew = (e) => {
        props.setCurrentPattern({})
        props.setPaletteColors(["#FFFFFF"])
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
            <h3 onClick={createPattern}>Save</h3>
            <h3 onClick={deletePattern}>Delete</h3>
            <h3 onClick={startNew}>New</h3>
            <h3 onClick={exportImage}>Export</h3>
            <Palette 
                currentColor={props.canvasInfo.currentColor}
                paletteInfo={props.paletteInfo}

            />
            <ColorPicker
                currentColor={props.canvasInfo.currentColor}
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

const mapDispatchToProps = {
    dispatchSetName: setName
}

// the return value of mapStateToProps is an object that will be merged into DrawContainer's props
let mapStateToProps = (reduxState) => {
  return {
    canvasInfo: reduxState.canvasInfo,
    paletteInfo: reduxState.paletteInfo,
    currentPattern: reduxState.currentPatternInfo.pattern
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ToolContainer)