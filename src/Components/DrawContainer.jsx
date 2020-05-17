import React from 'react';
import Canvas from './Canvas'
import ToolContainer from './ToolContainer';

import {connect} from 'react-redux'

//Parents: App

const DrawContainer = (props) => {

  return (
    <>
      <div className="draw-page">
        <div></div>
        <div className="draw-container">
          <h3>{props.canvasInfo.currentName} {localStorage.token ? "by" : ""} { props.currentPattern.creator ? props.currentPattern.creator : props.userInfo.user.username}</h3>
          <Canvas
              canvasInfo={props.canvasInfo}
              paletteInfo={props.paletteInfo}
              currentPattern={props.currentPattern}
              currentPalette={props.currentPalette}
              setPaletteColorsDispatch={props.setPaletteColorsDispatch}
              clearCTXDispatch={props.clearCTXDispatch}
              currentImageDispatch={props.currentImageDispatch}
              setColorDispatch={props.setColorDispatch}
              replacingDispatch={props.replacingDispatch}
              allowReplaceDispatch={props.allowReplaceDispatch}
          />
        </div>
        <div className="toolbox">
          <ToolContainer
              createPattern={props.createPattern}
              updatePattern={props.updatePattern}
              deletePattern={props.deletePattern}
              setPaletteColorsDispatch={props.setPaletteColorsDispatch}
              clearCTXDispatch={props.clearCTXDispatch}
              currentImageDispatch={props.currentImageDispatch}
              setColorDispatch={props.setColorDispatch}
              replacingDispatch={props.replacingDispatch}
              pickerMouseDownDispatch={props.pickerMouseDownDispatch}
              allowReplaceDispatch={props.allowReplaceDispatch}
          />
        </div>
      </div>
    </>
  )
};

// let setPaletteColors = (palette) => {
//   return {
//     type: "SET_PALETTE_COLORS",
//     payload: palette
//   }
// }

let clearContext = (bool) => {
  return {
    type: "CLEAR_CONTEXT",
    payload: bool
  }
}

const setImage = (image) => {
  return {
      type: "SET_IMAGE",
      payload: image
  }
}

const setColor = (color) => {
  return {
      type: "SET_COLOR",
      payload: color
  }
}

const replacingColor = (bool) => {
  return {
    type: "REPLACING",
    payload: bool
  }
}

const allowColorReplace = (bool) => {
  return {
    type: "ALLOW_REPLACEMENT",
    payload: bool
  }
}

const mapDispatchToProps = {
  // setPaletteColorsDispatch: setPaletteColors,
  clearCTXDispatch: clearContext,
  currentImageDispatch: setImage,
  setColorDispatch: setColor,
  replacingDispatch: replacingColor,
  allowReplaceDispatch: allowColorReplace
}

let mapStateToProps = (reduxState) => {
  return {
    canvasInfo: reduxState.canvasInfo,
    paletteInfo: reduxState.paletteInfo,
    currentPattern: reduxState.currentPatternInfo.pattern,
    currentPalette: reduxState.currentPatternInfo.currentPalette,
    userInfo: reduxState.userInfo
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DrawContainer)