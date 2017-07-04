import BHInput from './BHInput';
import {PREFIX} from '../variables';
import React from 'react';
import PropTypes from 'prop-types';

class NumberInput extends BHInput {
   constructor(props) {
      super(props);
   }

   _getClassName(clsn) {
      return clsn ? `${BHINPUT_CONTAINER_CLASSNAME} ${clsn}` : BHINPUT_CONTAINER_CLASSNAME;
   }

   render() {
      const {className, style, type, icon, defaultValue, ...restProps} = this.props;
      const getInput = () => {
         const iptType = type == 'number' ? "text" : type;
         const iptClassName = type == 'number' ? `${BHINPUT_CLASSNAME} input-number` : BHINPUT_CLASSNAME;
         let iptDefaultVal;

         if(type == 'number') {
            if(typeof defaultValue == 'number') {
               iptDefaultVal = defaultValue;
            }
            else{
               iptDefaultVal = 0;
            }
         }
         else {
            iptDefaultVal = defaultValue;
         }

         return <input className={iptClassName} type={iptType} defaultValue={iptDefaultVal} {...restProps}/>
      }
      return (
         <div className={this._getClassName(className)} style={style}>
            {icon &&
               <i className={`iconfont ${icon}`}></i>
            }
            {getInput()}
            {type == 'number' &&
               <div className={'count-btn-container'}>
                  <div className='count-btn count-add-btn'>+</div>
                  <div className={'count-btn count-subtract-btn'}>-</div>
               </div>
            }
         </div>
      )
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