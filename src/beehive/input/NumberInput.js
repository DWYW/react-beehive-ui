import BHInput from './BHInput';
import BHUtil from '../util/BHUtil';
import {PREFIX} from '../variables';
import React from 'react';
import PropTypes from 'prop-types';

class NumberInput extends BHInput {
   constructor(props) {
      super(props);
      this._bakValue = "";
      this.state = {
         btnLineHeight: null,
         value: ""
      }
   }

   componentDidMount() {
      const {defaultValue, value} = this.props;
      let  setValue = 0;

      if(defaultValue && defaultValue.toString().match(/^[-]?\d*$/g)) {
         setValue = defaultValue;
      }

      if(value && value.toString().match(/^[-]?\d*$/g)) {
         setValue = value;
      }

      this._updateValue(setValue)
      this._setCountBtnLineHeight();
   }

   render() {
      const props = Object.assign({}, this.props);
      delete props.min;
      delete props.max;
      delete props.value;
      delete props.onChange;
      delete props.onBlur;
      delete props.defaultValue;
      delete props.nextIcon;
      delete props.nextIconStyle;

      return (
         <div className={BHUtil.combineClassnames(NUMBER_CONTAINER)}>
            <BHInput {...props} type="text"  value={this.state.value} onBlur={this._handleBlur} onChange={this._handleChange}/>
            <div className={BHUtil.combineClassnames('count-btn-container', props.className, {
               'count-btn-container-disabled': props.disabled
            })} ref="countBtnContainer">
               <i className="iconfont icon-up count-btn count-add-btn"
                  style={{"lineHeight": this.state.btnLineHeight + "px"}}
                  onClick={this._handleCountAdd}></i>
               <i className="iconfont icon-down count-btn count-subtract-btn"
                  style={{"lineHeight": this.state.btnLineHeight + "px"}}
                  onClick={this._handleCountSubtract}></i>
            </div>
         </div>
      )

   }

   /**
    * Set count button lineHeight.
    */
   _setCountBtnLineHeight = () => {
      const lineHeight = this.refs.countBtnContainer.offsetHeight / 2;
      this.setState({
         btnLineHeight: lineHeight
      })
   }

   /**
    * Number input blur event handle.
    */
   _handleBlur = (e) => {
      if(e.target.value === "") {
         const value = 0;
         this._updateValue(value);

         if(this.props.onChange) {
            this.props.onChange(value.toString());
         }
      }
   }

   /**
    * Number input change event handle.
    */
   _handleChange = (e) => {
      let value = e.target.value;

      if(value.toString().match(/^[-]?\d*$/g)) {
         value = this.checkRange(value);
         this._updateValue(value);

         if(this.props.onChange) {
            this.props.onChange(value.toString());
         }
      }
      else {
         this.setState({
            value: this._bakValue
         })
      }
   }

   /**
    * Number add click event handle.
    */
   _handleCountAdd = () => {
      if(this.props.disabled === true || this.props.disabled === "disabled") {
         return false;
      }

      let value = this.state.value == "" ? 1 : parseInt(this.state.value) + 1;
      value = this.checkRange(value);
      this._updateValue(value.toString());

      if(this.props.onChange){
         this.props.onChange(value.toString());
      }
   }

   /**
    * Number subtract click event handle.
    */
   _handleCountSubtract = () => {
      if(this.props.disabled === true || this.props.disabled === "disabled") {
         return false;
      }

      let value = this.state.value == "" ? -1 :  parseInt(this.state.value) - 1;
      value = this.checkRange(value);
      value = value == "" ? 0 : value;
      this._updateValue(value.toString());

      if(this.props.onChange){
         this.props.onChange(value.toString());
      }
   }

   /**
    * check max and min value.
    */
   checkRange = (value) => {
      const {min, max} = this.props;

      if(min !== undefined && min.toString().match(/^[-]?\d*$/g) && (parseInt(value) < parseInt(min) ||
            (parseInt(min) >= 0 && value === '-')))
      {
         value = this._bakValue;
      }

      if(max !== undefined && max.toString().match(/^[-]?\d*$/g) && (parseInt(value) > parseInt(max) ||
            (parseInt(max) <= 0 && !value.toString.match(/^-/g))))
      {
         value = this._bakValue;

      }

      return value;
   }

   /**
    * Update value.
    */
   _updateValue = (value) => {
      this._bakValue = value;
      this.setState({
         value: value
      })
   }
}

NumberInput.propTypes = {
   className: PropTypes.string,
   min: PropTypes.number,
   max: PropTypes.number
}

const NUMBER_CONTAINER = `${PREFIX}-number-container`
export default NumberInput;
