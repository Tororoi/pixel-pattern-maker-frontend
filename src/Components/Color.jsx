import React from 'react';

//Parents: Palette

const Color = (props) => {

    const handleClick = (e) => {
        props.setColorDispatch(props.color)
    }

    return (
        <>
            <div className="color" >
                <div className="swatch"
                    style={props.currentColor===props.color ? {backgroundColor: props.color, border: "4px solid black", margin: "0px"} : {backgroundColor: props.color}}
                    onClick={handleClick}
                />
            </div>
        </>
    )
}

export default Color;