import React from 'react';

import {connect} from 'react-redux'

const Color = (props) => {

    return (
        <>
            <div className="color">
                <div className="swatch"
                    style={{backgroundColor: props.color}}
                />
            </div>
        </>
    )
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
    colorDispatch: setColor,
    addColorDispatch: addColor
  }

export default connect(null, mapDispatchToProps)(Color);