import React from 'react'
import PropTypes from 'prop-types'

class FlexBox extends React.Component {
   constructor(props) {
      super(props);
   }

   render() {
      const {className, flexDirection, flexWrap, justifyContent, alignItems, alignContent, ...restProps} = this.props;
      const attribute = {};
      flexDirection ? attribute['data-flexDirection'] = flexDirection : "";
      flexWrap ? attribute['data-flexWrap'] = flexWrap : "";
      justifyContent ? attribute['data-justifyContent'] = justifyContent : "";
      alignItems ? attribute['data-alignItems'] = alignItems : "";
      alignContent ? attribute['data-alignContent'] = alignContent : "";
      return (
         <div className={className ? `${FLEX_BOX_CLASSNAME} ${className}` : FLEX_BOX_CLASSNAME} {...attribute} {...restProps} >
            {this.props.children}
         </div>
      )
   }
}

FlexBox.propTypes = {
   flexDirection: PropTypes.string,
   flexWrap: PropTypes.string,
   justifyContent: PropTypes.string,
   alignItems: PropTypes.string,
   alignContent: PropTypes.string
};

const PREFIX = 'beehive';
const FLEX_BOX_CLASSNAME = `${PREFIX}-flex-box`;

export default FlexBox