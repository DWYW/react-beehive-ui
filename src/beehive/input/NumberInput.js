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

      return (
         <div className={BHUtil.combineClassnames(NUMBER_CONTAINER)}>
            <BHInput {...props} type="text"  value={this.state.value} onChange={this._handleChange}/>
            <div className={'count-btn-container'} ref="countBtnContainer">
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
    * Number input change event handle.
    */
   _handleChange = (e) => {
      let value = e.target.value;
      const {min, max} = this.props;

      if(value.toString().match(/^[-]?\d*$/g)) {
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

         this._updateValue(value);

         if(this._onChange) {
            this._onChange(e);
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

      this._updateValue(value.toString());

      if(this._onChange){
         this._onChange(value.toString());
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

      this._updateValue(value.toString());
      if(this._onChange){
         this._onChange(value.toString());
      }
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
