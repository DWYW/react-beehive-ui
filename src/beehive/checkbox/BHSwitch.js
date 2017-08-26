import {PREFIX} from '../variables';
import BHUtil from 'beehive/util/BHUtil';
import React from 'react';
import PropTypes from 'prop-types';

class BHSwitch extends React.Component {
   constructor(props) {
      super(props);
      this.switchChange = this.switchChange.bind(this);

      this.state = {
         type: props.type,
         isOpen: props.open,
         isDisabled: props.disabled
      }
   }

   componentWillReceiveProps(nextProps) {
      const st = {};
      if(nextProps.open && nextProps.open !== this.props.open && nextProps.open !== this.state.isOpen) {
         st['isOpen'] = nextProps.open === true || nextProps.open === "true" ? true : false;
      }

      if(nextProps.disabled && nextProps.disabled !== this.props.disabled && nextProps.disabled !== this.state.isDisabled) {
         st['isDisabled'] = nextProps.disabled === true || nextProps.disabled === "true" ? true : false;
      }

      this.setState(st);
   }

   switchChange(e) {
      if (this.state.disabled) {
         return false;
      }

      const st = {};
      const {isDisabled} = this.state;

      if(!isDisabled) {
         if (e.target.checked) {
            st['isOpen'] = true;
         }
         else {
            st['isOpen'] = false;
         }
      }

      this.setState(st);

      if(this.props.onChange) {
         this.props.onChange(e.target.checked)
      }
   }

   render() {
      const {type, isOpen, isDisabled} = this.state;
      const {className} = this.props;

      return (
         <div className={BHUtil.combineClassnames(BHSWITCH_CLASSNAME, className,
            {
               'smaller': type === 'smaller',
               'active': isOpen,
               'disabled': isDisabled
            })
         }>
            <div className="switch-container-BG"></div>
            <label className="switch-container-Btn">
               <input type="checkbox" checked={isOpen} onChange={this.switchChange}/>
            </label>
         </div>
      )
   }
}

BHSwitch.PropTypes = {
   type: PropTypes.string,
   open: PropTypes.bool,
   disabled: PropTypes.bool,
   onChange: PropTypes.func

}

BHSwitch.defaultProps = {
   type: 'normal',
   open: false,
   disabled: false
}

const BHSWITCH_CLASSNAME = `${PREFIX}-switch-container`

export default BHSwitch
