import {PREFIX} from '../variables';
import BHUtil from 'beehive/util/BHUtil';
import React from 'react';
import PropTypes from 'prop-types';

class BHCheckBox extends React.Component {
   constructor(props) {
      super(props);
   }

   handleSetCheckBoxStatus() {

   }

   render() {
      return (
         <div className={BHUtil.combineClassnames(BHCHECKBOX_CLASSNAME)}>
            <i></i>
            <i></i>
            <span className="checkbox-info">{this.props.children}</span>
            <input type="checkbox" checked={this.props.checked} onChange={this.handleSetCheckBoxStatus}/>
         </div>
      )
   }
}

BHCheckBox.propTypes = {
   className: PropTypes.string
}

const BHCHECKBOX_CLASSNAME = `${PREFIX}-checkbox-container`

export default BHCheckBox;