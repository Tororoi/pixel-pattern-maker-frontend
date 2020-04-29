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
              currentPattern={props.currentPattern}
          />
        </div>
        <div className="toolbox">
          <ToolContainer
              savePattern={props.savePattern}
              deletePattern={props.deletePattern}
              setCurrentPattern={props.setCurrentPattern}
              setPaletteColors={props.setPaletteColors}
          />
        </div>
      </div>
    </>
  )
};


let mapStateToProps = (reduxState) => {
  // console.log(reduxState.canvasInfo)
  return {
    canvasInfo: reduxState.canvasInfo,
    currentPattern: reduxState.currentPatternInfo.pattern
  }
}

export default connect(mapStateToProps)(DrawContainer)