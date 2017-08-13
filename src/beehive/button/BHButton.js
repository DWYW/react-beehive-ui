import BHUtil from 'beehive/util/BHUtil';
import FieldClick from './FieldClick';
import FlexBox from '../grid/FlexBox';
import FlexItem from '../grid/FlexItem';
import {PREFIX} from '../variables';
import PropTypes from 'prop-types';
import React from 'react';

class BHButton extends React.Component {
   constructor(props) {
      super(props);
   }

   _setClassName(className){
      return className ? `${BTN_CLASSNAME} ${className}` : BTN_CLASSNAME;
   }

   render() {
      let {className, animation, ...restProps} = this.props;
      let otherProps = this.props.disabled ? null : restProps;
      animation = this.props.disabled ? false : animation;
      className = this.props.disabled ? 'disabled' : className;
      return (
         <div className={this._setClassName(className)} {...otherProps} data-animation={animation && !BHUtil.isMobile()}>
            {animation && !BHUtil.isMobile() ? (
               <FieldClick>
                  <FlexBox justifyContent="center" alignItems="center" style={FLEX_BOX_STYLE}>
                     <FlexItem style={FLEX_ITEM_STYLE}>
                        {this.props.children}
                     </FlexItem>
                  </FlexBox>
               </FieldClick>
            ) : (
               <FlexBox justifyContent="center" alignItems="center" style={FLEX_BOX_STYLE}>
                  <FlexItem style={FLEX_ITEM_STYLE}>
                     {this.props.children}
                  </FlexItem>
               </FlexBox>
            )}
         </div>
      )
   }
}

BHButton.propTypes = {
   className: PropTypes.string,
   animation: PropTypes.bool
}

BHButton.defaultProps = {
   animation: false
}

const BTN_CLASSNAME = `${PREFIX}-button`;
const FLEX_BOX_STYLE = {
   width: '100%',
   height: '100%',
   boxSizing: 'border-box'
}
const FLEX_ITEM_STYLE = {
   textAlign: 'center',
   // marginTop: '-2px'
}

export default BHButton