import React from 'react';
import ColorPicker from './ColorPicker'
import Palette from './Palette'

import {connect} from 'react-redux'


const ToolContainer = (props) => {
//   console.log("PROPS OF CONTAINER", props )

    const handleClick = (e) => {
        let newPatternPOJO = {name: props.canvasInfo.currentName, image: props.canvasInfo.currentImage}
        props.savePattern(newPatternPOJO)
    }

    return (
        <>
            <h2>Toolbox</h2>
            <h3 onClick={handleClick}>Save</h3>
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



// the return value of mapStateToProps is an object that will be merged into DrawContainer's props
let mapStateToProps = (reduxState) => {
  return {
    canvasInfo: reduxState.canvasInfo,
    paletteInfo: reduxState.paletteInfo,
    currentPattern: reduxState.currentPatternInfo.pattern
  }
}

export default connect(mapStateToProps)(ToolContainer)