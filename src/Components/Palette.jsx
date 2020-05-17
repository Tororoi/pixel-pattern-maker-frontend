import React from 'react';
import Color from './Color'

//Parents: ToolContainer

const Palette = (props) => {
    // console.log(props)

    const paletteArray = props.paletteInfo.colors.map((color) => {
            return <Color 
                key={color.number} 
                color={color} 
                currentColor={props.currentColor}
                setColorDispatch={props.setColorDispatch}
                allowReplaceDispatch={props.allowReplaceDispatch}
                />
        })
    
    const handleClick = (e) => {
        let newColor = {number: props.paletteInfo.colors.length+1, hex: props.currentColor.hex, rData: []}

        props.addColorDispatch(newColor)
        props.setColorDispatch(newColor)
        //add an action that sets replacement allowed to false
        props.allowReplaceDispatch(false)
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