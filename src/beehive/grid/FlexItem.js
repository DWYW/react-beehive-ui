import React from 'react'
import PropTypes from 'prop-types'

class FlexItem extends React.Component {
   constructor(props){
      super(props);
   }

   render() {
      let {className, ...restProps} = this.props;
      className = className? `${FLEXITEM_CLASSNAME} ${className}` : FLEXITEM_CLASSNAME;
      return (
         <div className={className} {...restProps} >
            {this.props.children}
         </div>
      )

   }
}

FlexItem.propTypes = {
   className: PropTypes.string
};

const PREFIX = 'beehive';
const FLEXITEM_CLASSNAME = `${PREFIX}-flex-item`;

export default FlexItem