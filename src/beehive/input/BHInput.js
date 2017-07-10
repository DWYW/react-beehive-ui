import {PREFIX} from '../variables';
import React from 'react';
import PropTypes from 'prop-types';

class BHInput extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         value: this.props.defaultValue
      }
   }

   componentWillMount() {
      this.propsInit(this.props);
   }

   componentWillReceiveProps(nextPorps) {
      if(nextPorps.value != this.props.value) {
         this.setState({
            value: nextPorps.value
         })
      }
   }

   render() {
      return (
         <div className={this.getClassName(this.className)}>
            {this.iconClassName &&
               <i className={`iconfont ${this.iconClassName}`}></i>
            }
            <input className={BHINPUT_CLASSNAME}
               type={this.type} defaultValue={this.defaultValue}  style={this.style}
               {...this.restProps}/>
         </div>
      )
   }

   propsInit(props) {
      const {className, style, type, iconClassName, defaultValue, ...restProps} = props;
      this.className = className;
      this.style = style;
      this.type = type;
      this.iconClassName = iconClassName;
      this.defaultValue = defaultValue;
      this.restProps = restProps;
      delete this.props.value;
      this.setState({
         value: this.defaultValue
      })
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
   iconClassName: PropTypes.string

}

BHInput.defaultProps = {
   type: 'text',
   style: {}
}

const BHINPUT_CONTAINER_CLASSNAME = `${PREFIX}-input-container`
const BHINPUT_CLASSNAME = `${PREFIX}-input`
export default BHInput;