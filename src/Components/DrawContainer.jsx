import React from 'react';
import Canvas from './Canvas'
import ToolContainer from './ToolContainer';

import {connect} from 'react-redux'

//Parents: App

const DrawContainer = (props) => {

  return (
    <>
      <div className="draw-page">
        <div className="draw-container">
          <h2>Draw Container</h2>
          <Canvas
              canvasInfo={props.canvasInfo}
              paletteInfo={props.paletteInfo}
              currentPattern={props.currentPattern}
              currentPalette={props.currentPalette}
              setPaletteColorsDispatch={props.setPaletteColorsDispatch}
              clearCTXDispatch={props.clearCTXDispatch}
          />
        </div>
        <div className="toolbox">
          <ToolContainer
              createPattern={props.createPattern}
              updatePattern={props.updatePattern}
              deletePattern={props.deletePattern}
              resetPatternStateDispatch={props.resetPatternStateDispatch}
              setPaletteColorsDispatch={props.setPaletteColorsDispatch}
              clearCTXDispatch={props.clearCTXDispatch}
          />
        </div>
      </div>
    </>
  )
};

let resetPatternState = (pattern) => {
  return {
    type: "RESET_PATTERN_STATE"
  }
}

let setPaletteColors = (palette) => {
  return {
    type: "SET_PALETTE_COLORS",
    payload: palette
  }
}

let clearContext = (bool) => {
  return {
    type: "CLEAR_CONTEXT",
    payload: bool
  }
}

const mapDispatchToProps = {
  resetPatternStateDispatch: resetPatternState,
  setPaletteColorsDispatch: setPaletteColors,
  clearCTXDispatch: clearContext
}

let mapStateToProps = (reduxState) => {
  // console.log(reduxState.canvasInfo)
  return {
    canvasInfo: reduxState.canvasInfo,
    paletteInfo: reduxState.paletteInfo,
    currentPattern: reduxState.currentPatternInfo.pattern,
    currentPalette: reduxState.currentPatternInfo.currentPalette
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DrawContainer)