import {PREFIX} from '../variables';
import BHUtil from '../util/BHUtil';
import React from 'react';
import PropTypes from 'prop-types';

class BHInput extends React.Component {
   constructor(props) {
      super(props);
   }

   // componentWillMount() {
   //    this.propsInit(this.props);
   // }

   // componentWillReceiveProps(nextPorps) {
   //    if(nextPorps.value != this.props.value) {
   //       this.setState({
   //          value: nextPorps.value
   //       })
   //    }
   // }

   render() {
      const {className, prevIcon, nextIcon, ...props} = this.props;

      return (
         <div className={BHUtil.combineClassnames(BHINPUT_CONTAINER_CLASSNAME, className)}>
            {prevIcon &&
               <i className={BHUtil.combineClassnames('iconfont', prevIcon)}></i>
            }
            <input className={BHUtil.combineClassnames(BHINPUT_CLASSNAME,{
                  'hasIcon-prev': prevIcon,
                  'hasIcon-next': nextIcon
               })}
               type={this.type} defaultValue={this.defaultValue}  style={this.style}
               {...this.restProps}/>
            {nextIcon &&
               <i className={BHUtil.combineClassnames('iconfont', nextIcon)}></i>
            }
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

}

BHInput.propTypes = {
   type: PropTypes.string,
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
