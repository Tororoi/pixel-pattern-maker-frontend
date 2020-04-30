import React from 'react';
import {NavLink} from 'react-router-dom'

import {connect} from 'react-redux'

//Parents: PatternContainer, ProfileContainer

const Pattern = (props) => {


    const handleClick = (e) => {
        return (
            props.patternDispatch(props.pattern),
            props.paletteDispatch(props.pattern.palettes[0]),
            props.setImageDispatch(props.pattern.image),
            props.setNameDispatch(props.pattern.name),
            props.setPaletteColorsDispatch(props.pattern.palettes[0].colors)
        )
    }

    const handleFaved = (e) => {
        console.log("faved")
    }

    return (
        <>

        <div className="pattern-card">
            <NavLink to="/draw">
                <img className="pattern"
                    src={props.pattern.image}
                    alt={props.pattern.name}
                    onClick={handleClick}
                />
            </NavLink>
                <p>{props.pattern.name}</p>
                <p>By {props.pattern.creator}</p>
                <div className="fav-button" onClick={handleFaved}>★</div>
        </div>

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

const setImage = (image) => {
    return {
        type: "SET_IMAGE",
        payload: image
    }
}

const setName = (name) => {
    return {
        type: "SET_NAME",
        payload: name
    }
}

let setPaletteColors = (palette) => {
    return {
      type: "SET_PALETTE_COLORS",
      payload: palette
    }
  }

const mapDispatchToProps = {
    patternDispatch: setCurrentPattern,
    paletteDispatch: setCurrentPalette,
    setImageDispatch: setImage,
    setNameDispatch: setName,
    setPaletteColorsDispatch: setPaletteColors

  }

export default connect(null, mapDispatchToProps)(Pattern);