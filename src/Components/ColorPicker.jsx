import React from 'react';
import iro from '@jaames/iro';

//Parents: ToolContainer

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
    
    // componentWillUnmount() {
    //     this.wheelPicker.off('color:change', this.colorChangeCB)
    // }

    colorChangeCB = () => { 
        this.props.setColorDispatch(this.wheelPicker.color.hexString) 

    }

    handleClick = (e) => {
        this.props.addColorDispatch(this.wheelPicker.color.hexString)
    }

    render() {

        return(
            <div className="color-picker-wrapper">
                <div 
                    ref={this.colorPicker} 
                    onClick={this.handleClick}
                />
            </div>
        )

    }
}

export default ColorPicker;