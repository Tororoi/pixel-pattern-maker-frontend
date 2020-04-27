import React from 'react';
import iro from '@jaames/iro';

import {connect} from 'react-redux'


class ColorPicker extends React.Component {

    colorPicker = React.createRef();

    componentDidMount() { 
        this.wheelPicker = new iro.ColorPicker(this.colorPicker.current, {
            width: 350,
            color: this.props.currentColor,
            borderWidth: 1,
            borderColor: "#fff",
            sliderSize: 20
          });
        
        this.wheelPicker.on('color:change', this.colorChangeCB )
    }
    
    componentWillUnmount() {
        this.wheelPicker.off('color:change', this.colorChangeCB)
    }

    colorChangeCB = () => { this.props.colorDispatch(this.wheelPicker.color.hexString) }

    render() {

        return(
            <div className="color-picker-wrapper">
                <div ref={this.colorPicker} />
            </div>
        )

    }
}

const setColor = (color) => {
    return {
        type: "SET_COLOR",
        payload: color
    }
}

const mapDispatchToProps = {
    colorDispatch: setColor
  }

export default connect(null, mapDispatchToProps)(ColorPicker);