import {PREFIX} from '../variables';
import BHUtil from 'beehive/util/BHUtil';
import React from 'react';
import PropTypes from 'prop-types';

class BHCheckBox extends React.Component {
   constructor(props) {
      super(props);

      this.state = {
         isChecked: props.checked,
         isDisabled: props.disabled,
         animation: false,
         iconMarginTop: null
      }
   }

   componentDidMount() {
      this.setState({
         iconMarginTop: `-${parseInt(this.refs.checkboxContainer.offsetHeight / 2)}px`,
      })
   }

   componentWillReceiveProps(nextPorps) {
      const st = {};
      const {isChecked, isDisabled} = this.state;

      if(nextPorps.checked !== isChecked) {
         st.isChecked = nextPorps.checked;
      }

      if(nextPorps.disabled !== isDisabled) {
         st.isDisabled = nextPorps.disabled
      }

      this.setState(st);
   }

   handleSetCheckBoxStatus = (e) => {
      const st = {};
      st['isChecked'] = e.target.checked;

      if(!this.state.animation) {
         st['animation'] = true;
      }

      this.setState(st);

      if(this.props.onChange) {
         this.props.onChange(e);
      }
   }

   /**
    * Get Icon type.
    */
   getIconType = (iconType) => {
      iconType = iconType in BHCheckBox.ICONS ? iconType : 'default';
      return BHCheckBox.ICONS[iconType];
   }

   render() {
      let {isChecked, isDisabled, animation, iconMarginTop} = this.state;
      let {iconType, children, className, iconStyle, style, ...props} = this.props;
      const icons = this.getIconType(iconType);
      const _iconStyle = {marginTop: iconMarginTop}
      delete props.onChange;
      delete props.checked;
      delete props.disabled;

      return (
         <label ref='checkboxContainer' className={BHUtil.combineClassnames(BHCHECKBOX_CLASSNAME, className,{'disabled': isDisabled})} style={style}>
            <i className={BHUtil.combineClassnames('iconfont', icons.default, {
               'icon-animation-show': animation && !isChecked && this.props.type !== "radio",
               'icon-animation-hide': animation && isChecked && this.props.type !== "radio",
               'icon-checked': !isChecked,
               'icon-default': isChecked
            })} style={{...iconStyle, ..._iconStyle}}></i>
            <i className={BHUtil.combineClassnames('iconfont', icons.checked, {
               'icon-animation-show': animation && isChecked,
               'icon-animation-hide': animation && !isChecked && this.props.type !== "radio",
               'icon-checked': isChecked,
               'icon-default': !isChecked
            })} style={{...iconStyle, ..._iconStyle}}></i>
            <span className="checkbox-info">{children || this.props.value}</span>
            <input ref='checkbox' {...props}  disabled={isDisabled} checked={isChecked} onChange={this.handleSetCheckBoxStatus}/>
         </label>
      )
   }
}

BHCheckBox.propTypes = {
   className: PropTypes.string,
   disabled: PropTypes.bool,
   checked: PropTypes.bool,
   iconStyle: PropTypes.object,
   iconType: PropTypes.string,
   style: PropTypes.object,
   onChange: PropTypes.func,
   type: PropTypes.oneOf(["checkbox", "radio"])
}

BHCheckBox.defaultProps = {
   iconType: 'default',
   disabled: false,
   checked: false,
   type: "checkbox"
}

BHCheckBox.ICONS = {
   default: {
      default: 'icon-checkbox3',
      checked: 'icon-checkbox-checked'
   },
   heart: {
      default: 'icon-heart1',
      checked: 'icon-heart'
   },
   ghost: {
      default: 'icon-checkbox3',
      checked: 'icon-checkbox'
   }
}

const BHCHECKBOX_CLASSNAME = `${PREFIX}-checkbox-container`

export default BHCheckBox;
