import React from 'react';
import Color from './Color'

//Parents: ToolContainer

const Palette = (props) => {
    // console.log(props)

    const paletteArray = props.paletteInfo.colors.map((color) => {
            return <Color 
                key={props.paletteInfo.colors.indexOf(color)} 
                color={color} 
                currentColor={props.currentColor}
                setColorDispatch={props.setColorDispatch}
                />
        })
    

     return(
        <>
            <div className="palette">
                {paletteArray}
            </div>
        </>
    )
}

export default Palette;