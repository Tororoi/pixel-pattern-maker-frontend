import React from 'react';
import Pattern from './Pattern'

import {connect} from 'react-redux'

//Parents: App

const ProfileContainer = (props) => {
    console.log(props.user)

    const patternsArray = props.patterns.map((pattern) => {
            return <Pattern key={pattern.id} pattern={pattern}/>
        })
    

     return(
        <>
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
      user: reduxState.userInfo
    }
  }
  
  export default connect(mapStateToProps)(ProfileContainer)