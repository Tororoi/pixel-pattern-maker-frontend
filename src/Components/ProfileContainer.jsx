import React from 'react';
import Pattern from './Pattern'

import {connect} from 'react-redux'

//Parents: App

const ProfileContainer = (props) => {
    // console.log(props.user)

    const userFavorites = props.userFaves.map(fave => {
        return fave.pattern.id
    })

    const myPatternsArray = props.patterns.filter((pattern) => {
        if (props.user.profile === "My Favorites") {
            return userFavorites.includes(pattern.id)
        } else {
            return pattern.user_id === props.user.user.id
        }

    })

    const patternsArray = myPatternsArray.map((pattern) => {
            return <Pattern 
                key={pattern.id} 
                pattern={pattern} 
                favePattern={props.favePattern} 
                unFavePattern={props.unFavePattern} 
                userFaves={props.userFaves}
                />
        })
    
    const handleSwitch = (e) => {
        props.profileSwitch(e.target.innerText)
    }

     return(
        <>
            <div className="profile-switch">
                <h3 onClick={handleSwitch} style={props.user.profile === "My Favorites" ? {color: "gray"} : {color: "black"}}>My Patterns</h3>
                <h3>/</h3>
                <h3 onClick={handleSwitch} style={props.user.profile === "My Favorites" ? {color: "black"} : {color: "gray"}}>My Favorites</h3>
            </div>
            <div className="pattern-container">
                {patternsArray}
            </div>
        </>
    )
};


let mapStateToProps = (reduxState) => {
    // console.log(reduxState.canvasInfo)
    return {
      patterns: reduxState.patternInfo.patterns,
      user: reduxState.userInfo,
      userFaves: reduxState.userInfo.user.favorites
    }
  }
  
  export default connect(mapStateToProps)(ProfileContainer)