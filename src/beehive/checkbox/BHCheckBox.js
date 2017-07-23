import {PREFIX} from '../variables';
import BHUtil from 'beehive/util/BHUtil';
import React from 'react';
import PropTypes from 'prop-types';

class BHCheckBox extends React.Component {
   constructor(props) {
      super(props);
      this.handleSetCheckBoxStatus = this.handleSetCheckBoxStatus.bind(this);
      this.state = {
         isChecked: props.checked,
         isDisabled: props.disabled
      }
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

   handleSetCheckBoxStatus(e) {
      if(this.props.onChange) {
         this.props.onChange(e.target.checked);
      }

      this.setState({
         isChecked: e.target.checked
      })

   }

   render() {
      let {isChecked, isDisabled} = this.state;
      let {iconType, children, className, iconStyle, style} = this.props;
      iconType = iconType in BHCheckBox.ICONS ? iconType : 'default';
      const icons = BHCheckBox.ICONS[iconType];

      return (
         <label className={BHUtil.combineClassnames(BHCHECKBOX_CLASSNAME, className,{'disabled': isDisabled})} style={style}>
            <i className={BHUtil.combineClassnames('iconfont', icons.default, {
               'icon-checked': !isChecked,
               'icon-default': isChecked
            })} style={iconStyle}></i>
            <i className={BHUtil.combineClassnames('iconfont', icons.checked, {
               'icon-checked': isChecked,
               'icon-default': !isChecked
            })} style={iconStyle}></i>
            <span className="checkbox-info">{children}</span>
            <input ref='checkbox' type="checkbox" disabled={isDisabled} checked={isChecked} onChange={this.handleSetCheckBoxStatus}/>
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
   onChange: PropTypes.func
}

BHCheckBox.defaultProps = {
   iconType: 'default',
   disabled: false,
   checked: false
}

BHCheckBox.ICONS = {
   default: {
      default: 'icon-checkbox3',
      checked: 'icon-checkbox-checked'
   },
   heart: {
      default: 'icon-heart1',
      checked: 'icon-heart'
   }
}

const BHCHECKBOX_CLASSNAME = `${PREFIX}-checkbox-container`

export default BHCheckBox;
