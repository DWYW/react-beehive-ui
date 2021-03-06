import {PREFIX} from '../variables';
import BHUtil from '../util/BHUtil';
import React from 'react';
import PropTypes from 'prop-types';

class BHInput extends React.Component {
   constructor(props) {
      super(props);

      this.state = {
         iconLineHeight: 0,
         value: props.value || props.defaultValue || ""
      }
   }

   componentDidMount() {
      this.setState(() => ({
         iconLineHeight: this.input.offsetHeight - 2
      }))
   }

   componentWillReceiveProps(nextProps) {
      if(nextProps.value !== this.props.value) {
         this.setState({value: nextProps.value})
      }
   }

   getContainerStyle = (style) => {
      let inputStyle = Object.assign({}, style);
      const attrs = ["marginLeft", "marginTop", "marginRight", "marginBottom", "margin", "display", "width"];
      const containerStyle = {};

      if(inputStyle) {
         attrs.forEach((attr) => {
            if(attr in inputStyle) {
               containerStyle[attr] = inputStyle[attr];
               delete inputStyle[attr];
            }
         })

      }

      return {
         containerStyle: containerStyle,
         style: inputStyle
      }

   }

   render() {
      const {className, prevIcon, prevIconStyle, nextIcon, nextIconStyle, style, ...props} = this.props;
      const styles = this.getContainerStyle(style);

      if(props.value) {
         delete props.defaultValue;
         delete props.value;
      }

      const restProps = this.props.value ? Object.assign({},props,{value: this.state.value}) : props;

      return (
         <div className={BHUtil.combineClassnames(BHINPUT_CONTAINER_CLASSNAME, className)} style={styles.containerStyle}>
            {prevIcon &&
               <i className={BHUtil.combineClassnames('iconfont', prevIcon, {'input-prev-icon': prevIcon})}
                  style={Object.assign({}, prevIconStyle, {"lineHeight": `${this.state.iconLineHeight}px`})}></i>
            }

            <input ref={(input) => this.input = input}
               className={BHUtil.combineClassnames(BHINPUT_CLASSNAME,{
                  'hasIcon-prev': prevIcon,
                  'hasIcon-next': nextIcon
               })} style={styles.style} {...restProps} />
            {nextIcon &&
               <i className={BHUtil.combineClassnames('iconfont', nextIcon, {'input-next-icon': nextIcon})}
                  style={Object.assign({}, nextIconStyle, {"lineHeight": `${this.state.iconLineHeight}px`})}></i>
            }
         </div>
      )
   }

}

BHInput.propTypes = {
   className: PropTypes.string,
   prevIcon: PropTypes.string,
   prevIconStyle: PropTypes.object,
   nextIcon: PropTypes.string,
   nextIconStyle: PropTypes.object

}

BHInput.defaultProps = {
   type: 'text'
}

const BHINPUT_CONTAINER_CLASSNAME = `${PREFIX}-input-container`
const BHINPUT_CLASSNAME = `${PREFIX}-input`
export default BHInput;