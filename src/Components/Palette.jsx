import React from 'react';
import Color from './Color'

//Parents: ToolContainer

const Palette = (props) => {
    // console.log(props)

    const paletteArray = props.paletteInfo.colors.map((color) => {
            return <Color 
                key={props.paletteInfo.colors.number} 
                color={color} 
                currentColor={props.currentColor}
                setColorDispatch={props.setColorDispatch}
                />
        })
    
    const handleClick = (e) => {
        // props.addColorDispatch("#ffffff")
        // props.setColorDispatch("#ffffff")
        let newColor = props.currentColor
        newColor.number = props.paletteInfo.colors.length+1

        props.addColorDispatch(newColor)
        props.setColorDispatch(newColor)
    }

     return(
        <>
            <div className="palette">
                {paletteArray}
                <div className="add-color-button" onClick={handleClick}>+</div>
            </div>
        </>
    )
}

export default Palette;