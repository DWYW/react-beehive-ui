import {PREFIX} from '../variables';
import React from 'react';
import PropTypes from 'prop-types';

class BHInput extends React.Component {
   constructor(props) {
      super(props);
   }

   componentWillMount() {
      this.propsInit();
   }

   render() {
      return (
         <div className={this.getClassName(this._className)} style={this._style}>
            {this.icon &&
               <i className={`iconfont ${this.icon}`}></i>
            }
            <input className={BHINPUT_CLASSNAME}
               type={this.type} defaultValue={this.defaultValue}
               {...this.restProps}/>
         </div>
      )
   }

   propsInit() {
      const {className, style, type, icon, defaultValue, ...restProps} = this.props;
      this.className = className;
      this.style = style;
      this.type = type;
      this.icon = icon;
      this.defaultValue = defaultValue;
      this.restProps = restProps;
   }

   getClassName(clsn) {
      return clsn ? `${BHINPUT_CONTAINER_CLASSNAME} ${clsn}` : BHINPUT_CONTAINER_CLASSNAME;
   }

   set type(type) {
      this._type = type == 'number' ? 'text' : type;
   }

   get type(){
      return this._type;
   }

}

BHInput.propTypes = {
   type: PropTypes.string,
   style: PropTypes.object,
   className: PropTypes.string,

}

const BHINPUT_CONTAINER_CLASSNAME = `${PREFIX}-input-container`
const BHINPUT_CLASSNAME = `${PREFIX}-input`
export default BHInput;