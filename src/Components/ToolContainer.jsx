import React from 'react';

import {connect} from 'react-redux'


const DrawContainer = (props) => {
  // console.log("PROPS OF CONTAINER", props.mouseStatus.mouseDown )

  return (
    <>
        <h2>Toolbox</h2>

    </>
  )
};



// the return value of mapStateToProps is an object that will be merged into DrawContainer's props
let mapStateToProps = (reduxState) => {
  console.log(reduxState)
  return {
    canvasInfo: reduxState.canvasInfo
  }
}

export default connect(mapStateToProps)(DrawContainer)