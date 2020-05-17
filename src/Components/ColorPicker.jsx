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
        // this.props.pickerClickDispatch(false)
    }

    componentDidMount() { 
        this.wheelPicker = new iro.ColorPicker(this.colorPicker.current, {
            width: 260,
            color: this.props.canvasInfo.currentColor.hex,
            borderWidth: 4,
            borderColor: "#000000",
            sliderSize: 20,
            // layout: [
            //     { 
            //         component: iro.ui.Slider,
            //         options: {
            //           sliderType: 'saturation' // can also be 'hue', 'saturation', 'value', 'alpha' or 'kelvin'
            //         }
            //     }
            // ]
          });
        
        this.wheelPicker.on('color:change', this.colorChangeCB )
    }

    componentDidUpdate() {
        if (this.props.paletteInfo.insidePicker === false && !this.props.paletteInfo.pickerMouseDown) {this.wheelPicker.color.hexString = this.props.canvasInfo.currentColor.hex}
    }

    colorChangeCB = () => { 
        // console.log(`color changed to ${this.wheelPicker.color.hexString}`, this.props.canvasInfo.replacing)
        //-----*****BUG: Currently after adding a color, must click on color selector circle and drag. cannot simply click on another area of colorpicker*****-----//
        const colorToChange = this.props.paletteInfo.colors.find((c) => {return c.number === this.props.canvasInfo.currentColor.number})
        if (colorToChange) {
            this.props.setColorDispatch({number: this.props.canvasInfo.currentColor.number, hex: this.wheelPicker.color.hexString, rData: this.props.canvasInfo.currentColor.rData})
            this.props.updateColorDispatch({previousColor: colorToChange, newColor: this.wheelPicker.color.hexString})
            }
         
        this.props.toolDispatch("pencil")
        this.props.replacingDispatch(true)
    }

    mouseDown = (e) => {
        this.props.pickerMouseDownDispatch(true)
    }

    mouseUp = (e) => {

        let cvs = document.createElement('canvas');
        cvs.width = this.props.canvasInfo.imageSize; //pixel scale 1. Add a multiplier to export form.
        cvs.height = this.props.canvasInfo.imageSize;
        cvs.getContext('2d').drawImage(this.props.canvasInfo.canvas,0,0,256,256,0,0,this.props.canvasInfo.imageSize,this.props.canvasInfo.imageSize); // first four coords are the cropping area
        this.props.currentImageDispatch(cvs.toDataURL())
    }

    render() {

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