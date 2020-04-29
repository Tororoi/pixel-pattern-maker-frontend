import React from 'react';
import {NavLink} from 'react-router-dom'

import {connect} from 'react-redux'

//Parents: PatternContainer, ProfileContainer

const Pattern = (props) => {


    const handleClick = (e) => {
        return (
            props.patternDispatch(props.pattern),
            props.paletteDispatch(props.pattern.palettes[0])
        )
    }

    return (
        <>
        <NavLink to="/draw">
            <div className="pattern" onClick={handleClick}>
                <img className="thumbnail"
                    src={props.pattern.image}
                    alt={props.pattern.name}
                />
            </div>
        </NavLink>
        </>
    )
}

const setCurrentPattern = (pattern) => {
    return {
        type: "SET_CURRENT_PATTERN",
        payload: pattern
    }
}

const setCurrentPalette = (palette) => {
    return {
        type: "SET_CURRENT_PALETTE",
        payload: palette
    }
}

const mapDispatchToProps = {
    patternDispatch: setCurrentPattern,
    paletteDispatch: setCurrentPalette
  }

export default connect(null, mapDispatchToProps)(Pattern);