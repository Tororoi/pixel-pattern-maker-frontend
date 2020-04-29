import React from 'react';
import {NavLink} from 'react-router-dom'

import {connect} from 'react-redux'

//Parents: PatternContainer, ProfileContainer

const Pattern = (props) => {


    const handleClick = (e) => {
        return (
            props.patternDispatch(props.pattern)
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

const mapDispatchToProps = {
    patternDispatch: setCurrentPattern
  }

export default connect(null, mapDispatchToProps)(Pattern);