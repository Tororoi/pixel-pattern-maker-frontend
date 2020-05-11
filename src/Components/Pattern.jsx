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
            props.setImageSizeDispatch(props.pattern.size),
            props.setNameDispatch(props.pattern.name),
            props.setPaletteColorsDispatch(props.pattern.palettes[0].colors)
            // props.setColorDispatch(props.pattern.palettes[0].colors[0])
        )
    }

    const handleFaved = (e) => {
        if (!userFavorites.includes(props.pattern.id)) {
            props.favePattern(props.pattern.id)
        } else {
            const badFave = props.userFaves.find(fave => {
                return fave.pattern.id === props.pattern.id
            })
            props.unFavePattern(badFave)
        }
    }

    const userFavorites = props.userFaves.map(fave => {
        return fave.pattern.id
    })

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
                <div className="fav-button" style={ userFavorites.includes(props.pattern.id) ? {color: "rgb(255, 217, 0)", WebkitTextStrokeColor: "rgb(255, 217, 0)"} : {color: "white"}} onClick={handleFaved}>★</div>
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

const setImageSize = (size) => {
    return {
        type: "SET_IMAGE_SIZE",
        payload: size
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

const setColor = (color) => {
    return {
        type: "SET_COLOR",
        payload: color
    }
}

const mapDispatchToProps = {
    patternDispatch: setCurrentPattern,
    paletteDispatch: setCurrentPalette,
    setImageDispatch: setImage,
    setImageSizeDispatch: setImageSize,
    setNameDispatch: setName,
    setPaletteColorsDispatch: setPaletteColors,
    setColorDispatch: setColor
  }

export default connect(null, mapDispatchToProps)(Pattern);