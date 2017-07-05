import BHInput from './BHInput';
import {PREFIX} from '../variables';
import React from 'react';
import PropTypes from 'prop-types';

class NumberInput extends BHInput {
   constructor(props) {
      super(props);
      this._timeout = null;
      this.state = {
         value: this.defaultValue
      }
   }

   render() {
      console.log(this.type)
      return (
         <div className={this.getClassName(this.className)} style={this.style}>
            {this.icon &&
               <i className={`iconfont ${this.icon}`}></i>
            }
            <input ref={'numberInput'} className={BHINPUT_CLASSNAME}
               type={this.type} defaultValue={this.defaultValue}
               onChange={(e) => {this._handleChange(e)}} value={this.state.value}
               {...this.restProps}/>
            <div className={'count-btn-container'}>
               <div className='count-btn count-add-btn'><span></span></div>
               <div className={'count-btn count-subtract-btn'}><span></span></div>
            </div>
         </div>
      )
   }

   propsInit(){
      super.propsInit();
      this._onChange = this.restProps.onChange;
      this._bakValue = this.defaultValue;
      delete this.restProps.onChange;
      console.log(this)
   }

   set type(type) {
      console.log(type)
      this._type = type != 'number' ? 'number' : type;
   }

   set defaultValue(value) {
      this._defaultValue = typeof value == 'number' ? value : 0;
   }

   get defaultValue(){
      return this._defaultValue;
   }

   _handleChange(e) {
      console.log(e.target.value)
      console.log(this.state.value)
      let value = e.target.value;
      clearTimeout(this._timeout);

      this._timeout = window.setTimeout(()=>{
         if(value.match(/^\d+$/g)) {
            this._bakValue = value;
            this.setState({
               value: value
            })
         }
         else {
            this.setState({
               value: this._bakValue
            })

         }

         this._onChange(value)
      },100)
   }
}

NumberInput.propTypes = {
   type: PropTypes.string,
   style: PropTypes.object,
   className: PropTypes.string,

}

const BHINPUT_CONTAINER_CLASSNAME = `${PREFIX}-input-container`
const BHINPUT_CLASSNAME = `${PREFIX}-input`
export default NumberInput;