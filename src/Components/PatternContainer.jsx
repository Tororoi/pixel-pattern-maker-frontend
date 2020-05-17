import React from 'react';
import Pattern from './Pattern'

import {connect} from 'react-redux'

//Parents: App

const PatternContainer = (props) => {

    const patternsArray = props.patterns.map((pattern) => {
            return <Pattern 
                key={pattern.id} 
                pattern={pattern} 
                favePattern={props.favePattern} 
                unFavePattern={props.unFavePattern} 
                userFaves={props.userFaves}
                setCurrentPatternDispatch={props.setCurrentPatternDispatch}
                setPaletteColorsDispatch={props.setPaletteColorsDispatch}
                />
        })
    

     return(
        <>
            {/* <h3>Pixel Pattern Maker</h3> */}
            <div className="pattern-container">
                {patternsArray}
            </div>
        </>
    )
};


let mapStateToProps = (reduxState) => {
    return {
      patterns: reduxState.patternInfo.patterns,
      userFaves: reduxState.userInfo.user.favorites
    }
  }
  
  export default connect(mapStateToProps)(PatternContainer)