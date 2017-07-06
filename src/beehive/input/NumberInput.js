import BHInput from './BHInput';
import {PREFIX} from '../variables';
import React from 'react';
import PropTypes from 'prop-types';

class NumberInput extends BHInput {
   constructor(props) {
      super(props);
      this._timeout = null;
      this._handleCountAdd = this._handleCountAdd.bind(this);
      this._handleCountSubtract = this._handleCountSubtract.bind(this);
   }

   componentWillReceiveProps(nextPorps) {
      if(nextPorps.value != this.props.value && nextPorps.value.toString().match(/^[-]?\d*$/g)) {
         this._updateValue(nextPorps.value)
      }
   }

   render() {
      return (
         <div className={this.getClassName(this.className)}>
            {this.icon &&
               <i className={`iconfont ${this.icon}`}></i>
            }
            <input className={`${BHINPUT_CLASSNAME} input-number`} type={this.type} style={this.style}
               onChange={(e) => {this._handleChange(e)}} value={this.state.value}
               {...this.restProps}/>
            <div className={'count-btn-container'}>
               <div className='count-btn count-add-btn' onClick={this._handleCountAdd}><span></span></div>
               <div className={'count-btn count-subtract-btn'} onClick={this._handleCountSubtract}><span></span></div>
            </div>
         </div>
      )
   }

   propsInit(props){
      super.propsInit(props);
      const {onChange, ...restProps} = this.restProps;
      this._onChange = onChange;
      this.restProps = restProps;
      this._bakValue = this.defaultValue;
   }

   set type(type) {
      this._type = "text"
   }

   get type() {
      return this._type;
   }

   set defaultValue(value) {
      this._defaultValue = typeof value == 'number' ? value : 0;
   }

   get defaultValue(){
      return this._defaultValue;
   }

   _handleChange(e) {
      let value = e.target.value;
      clearTimeout(this._timeout);

      this._timeout = window.setTimeout(()=>{
         if(value.match(/^[-]?\d*$/g)) {
            this._updateValue(value);

            if(this._onChange){
               this._onChange(value);
            }
         }
         else {
            this.setState({
               value: this._bakValue
            })
         }
      },100)
   }

   _handleCountAdd() {
      const value = this.state.value == "" ? 1 : parseInt(this.state.value) + 1;
      this._updateValue(value.toString());

      if(this._onChange){
         this._onChange(value.toString());
      }
   }

   _handleCountSubtract() {
      const value = this.state.value == "" ? -1 :  parseInt(this.state.value) - 1;
      this._updateValue(value.toString());
      if(this._onChange){
         this._onChange(value.toString());
      }
   }

   _updateValue(value) {
      this._bakValue = value;
      this.setState({
         value: value
      })
   }
}

NumberInput.propTypes = {
   type: PropTypes.string,
   style: PropTypes.object,
   className: PropTypes.string
}

NumberInput.defaultProps = {
   type: 'number',
   style: {}
}

const BHINPUT_CLASSNAME = `${PREFIX}-input`
export default NumberInput;