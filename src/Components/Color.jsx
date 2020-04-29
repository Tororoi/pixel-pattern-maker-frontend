import React from 'react';

//Parents: Palette

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

export default Color;