import React from 'react';
// import iro from '@jaames/iro';
import Color from './Color'

import {connect} from 'react-redux'


const Palette = (props) => {
    // console.log(props)

    const paletteArray = props.paletteInfo.colors.map((color) => {
            return <Color key={props.paletteInfo.colors.indexOf(color)} color={color} currentColor={props.currentColor}/>
        })
    

     return(
        <>
            <div className="palette">
                {paletteArray}
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

export default connect(null, mapDispatchToProps)(Palette);