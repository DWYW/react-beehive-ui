import {PREFIX} from '../variables';
import BHUtil from '../util/BHUtil';
import React from 'react';
import PropTypes from 'prop-types';

class Tabs extends React.Component {
   constructor(props) {
      super(props);
   }

   render() {
      const {className, ...restProps} = this.props;

      return (
         <div className={BHUtil.combineClassnames("beehive-tabs", className)} {...restProps}>
            {this.createTabLabel()}
            <div>{this.props.children}</div>
         </div>
      )
   }

   /**
    * Create tab labels.
    */
   createTabLabel = () => {
      const {children, selected} = this.props;

      return (
         <div className="tabs-container">
            {
               children.map((child, key) => {
                  const {label, ...childProps} = child.props;
                  delete childProps.style;

                  return (
                     <a {...childProps} className={BHUtil.combineClassnames("label-container", {actived: selected == key})} key={`label${key}`}>
                        <span>{label}</span>
                     </a>
                  )
               })
            }
         </div>
      )
   }
}


Tabs.propTypes = {
   className: PropTypes.string,
   selected: PropTypes.number
}

Tabs.defaultProps = {
   selected: 0
}

export default Tabs;