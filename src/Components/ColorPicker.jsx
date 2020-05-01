import React from 'react';
import iro from '@jaames/iro';

//Parents: ToolContainer

class ColorPicker extends React.Component {

    colorPicker = React.createRef();

    enter = (e) => {
        this.props.pickerDispatch(true)
    }

    leave = (e) => {
        this.props.pickerDispatch(false)
    }

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
        this.wheelPicker.color = "#ffffff"
        this.props.setColorDispatch("#ffffff")
    }

    componentDidUpdate() {
        if (this.props.paletteInfo.insidePicker === false) {this.wheelPicker.color.hexString = this.props.currentColor}
    }

    // mouseEnter = (e) => {
    //     console.log(`before: ${this.wheelPicker.color.hexString}`)
    //     this.wheelPicker.color.hexString = this.props.currentColor
    //     console.log(`after: ${this.wheelPicker.color.hexString}`)
    // }

    colorChangeCB = () => { 
        const colorToChange = this.props.paletteInfo.colors.find((c) => {return c === this.props.currentColor})
        if (colorToChange) {
            this.props.updateColorDispatch({oldColor: this.props.currentColor, newColor: this.wheelPicker.color.hexString})
            }
        

        this.props.setColorDispatch(this.wheelPicker.color.hexString) 
    }

    handleClick = (e) => {

        // this.props.addColorDispatch(this.wheelPicker.color.hexString)
    }

    render() {
        // if (this.wheelPicker) {this.wheelPicker.color.hexString = this.props.currentColor}

        return(
            <div className="color-picker-wrapper">
                <div 
                    ref={this.colorPicker} 
                    onClick={this.handleClick}
                    onMouseEnter={this.enter}
                    onMouseLeave={this.leave}
                />
            </div>
        )

    }
}

export default ColorPicker;