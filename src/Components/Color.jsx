import React from 'react';

import {connect} from 'react-redux'

const Color = (props) => {

    const handleClick = (e) => {
        props.setColorDispatch(props.color)
    }

    return (
        <>
            <div className="color" style={props.currentColor===props.color ? {backgroundColor: "black", } : {border: "none"}}>
                <div className="swatch"
                    style={{backgroundColor: props.color}}
                    onClick={handleClick}
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
    setColorDispatch: setColor,
    addColorDispatch: addColor
  }

export default connect(null, mapDispatchToProps)(Color);