import React from 'react'
import PropTypes from 'prop-types'
import './FlexGrid.less'

class FlexItem extends React.Component {
   constructor(props){
      super(props);
   }

   render() {
      let {className, ...restProps} = this.props;
      className = className ? `${FLEX_ITEM_CLASSNAME} ${className}` : FLEX_ITEM_CLASSNAME;
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
const FLEX_ITEM_CLASSNAME = `${PREFIX}-flex-item`;

export default FlexItem