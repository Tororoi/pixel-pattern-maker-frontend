import React from 'react';
import Canvas from './Canvas'
import ToolContainer from './ToolContainer';

import {connect} from 'react-redux'

const DrawContainer = (props) => {
  // console.log("PROPS OF CONTAINER", props.mouseStatus.mouseDown )

  return (
    <>
      <div className="draw-page">
        <div className="draw-container">
          <h2>Draw Container</h2>
          <Canvas
              mouseDown={props.canvasInfo.mouseDown}
              boxSize={props.canvasInfo.boxSize}
              currentColor={props.canvasInfo.currentColor}
              squares={props.canvasInfo.squares}
          />
        </div>
        <div className="toolbox">
          <ToolContainer
          />
        </div>
      </div>
    </>
  )
};



// the return value of mapStateToProps is an object that will be merged into DrawContainer's props
let mapStateToProps = (reduxState) => {
  // console.log(reduxState.canvasInfo)
  return {
    canvasInfo: reduxState.canvasInfo
  }
}

export default connect(mapStateToProps)(DrawContainer)