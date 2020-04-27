import React from 'react';
import Pattern from './Pattern'

import {connect} from 'react-redux'

const PatternContainer = (props) => {
    // console.log(props.patterns)

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
      patterns: reduxState.patternInfo.patterns
    }
  }
  
  export default connect(mapStateToProps)(PatternContainer)