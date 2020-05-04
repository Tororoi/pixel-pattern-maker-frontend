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
        this.props.pickerClickDispatch(false)
    }

    componentDidMount() { 
        this.wheelPicker = new iro.ColorPicker(this.colorPicker.current, {
            width: 260,
            color: this.props.canvasInfo.currentColor,
            borderWidth: 4,
            borderColor: "#000000",
            sliderSize: 20
          });
        
        this.wheelPicker.on('color:change', this.colorChangeCB )

    }
    
    componentWillUnmount() {
        // const c = this.props.paletteInfo.colors[0]
        // this.wheelPicker.color = c
        // this.props.setColorDispatch(c)
    }

    componentDidUpdate() {
        if (this.props.paletteInfo.insidePicker === false) {this.wheelPicker.color.hexString = this.props.canvasInfo.currentColor}
    }

    colorChangeCB = () => { 
        // this.props.pickerClickDispatch(true)
        const colorToChange = this.props.paletteInfo.colors.find((c) => {return c === this.props.canvasInfo.currentColor})

        if (colorToChange) {
            this.props.updateColorDispatch({oldColor: this.props.canvasInfo.currentColor, newColor: this.wheelPicker.color.hexString})
            }
        

        this.props.setColorDispatch(this.wheelPicker.color.hexString) 
    }

    mouseDown = (e) => {
        this.props.pickerClickDispatch(true)
    }

    mouseUp = (e) => {
        this.props.pickerClickDispatch(false)

        let cvs = document.createElement('canvas');
        cvs.width = this.props.canvasInfo.imageSize; //pixel scale 1. Add a multiplier to export form.
        cvs.height = this.props.canvasInfo.imageSize;
        cvs.getContext('2d').drawImage(this.props.canvasInfo.canvas,0,0,256,256,0,0,this.props.canvasInfo.imageSize,this.props.canvasInfo.imageSize); // first four coords are the cropping area
        this.props.currentImageDispatch(cvs.toDataURL())
    }

    render() {
        // if (this.wheelPicker) {this.wheelPicker.color.hexString = this.props.currentColor}

        return(
            <div className="color-picker-wrapper">
                <div 
                    ref={this.colorPicker} 
                    onMouseDown={this.mouseDown}
                    onMouseUp={this.mouseUp}
                    onMouseEnter={this.enter}
                    onMouseLeave={this.leave}
                />
            </div>
        )

    }
}

export default ColorPicker;