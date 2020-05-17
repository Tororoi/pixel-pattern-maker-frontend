import React from 'react';

//Parents: Palette

const Color = (props) => {

    const handleClick = (e) => {
        props.setColorDispatch(props.color)
        //add action that sets replacement allowed to true
        props.allowReplaceDispatch(true)
    }

    return (
        <>
            <div className="color" >
                <div className="swatch"
                    style={props.currentColor.number===props.color.number ? {backgroundColor: props.color.hex, border: "4px solid black", margin: "0px"} : {backgroundColor: props.color.hex}}
                    onClick={handleClick}
                />
            </div>
        </>
    )
}

export default Color;