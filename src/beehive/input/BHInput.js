import {PREFIX} from '../variables';
import React from 'react';
import PropTypes from 'prop-types';

class BHInput extends React.Component {
   constructor(props) {
      super(props);
   }

   _getClassName(clsn) {
      return clsn ? `${BHINPUT_CONTAINER_CLASSNAME} ${clsn}` : BHINPUT_CONTAINER_CLASSNAME;
   }

   render() {
      const {className, style, type, icon, ...restProps} = this.props;
      return (
         <div className={this._getClassName(className)} style={style}>
            {icon &&
               <i className={`iconfont ${icon}`}></i>
            }
            <input className={BHINPUT_CLASSNAME} type={type} {...restProps}/>
            {type == 'number' &&
               <div className={'count-btn-container'}>
                  <div className={'count-btn count-add-btn'}>+</div>
                  <div className={'count-btn count-subtract-btn'}>-</div>
               </div>
            }
         </div>
      )
   }
}

BHInput.propTypes = {
   type: PropTypes.string,
   style: PropTypes.object,
   className: PropTypes.string,

}

const BHINPUT_CONTAINER_CLASSNAME = `${PREFIX}-input-container`
const BHINPUT_CLASSNAME = `${PREFIX}-input-container`
export default BHInput;