import React from 'react'
import PropTypes from 'prop-types'
import './BeehiveGrid.less'

class FlexBox extends React.Component {
   constructor(props) {
      super(props);
   }

   render() {
      const {flexDirection, flexWrap, justifyContent, alignItems, alignContent, ...restProps} = this.props;
      const attribute = {};
      flexDirection ? attribute['data-flexDirection'] = flexDirection : "";
      flexWrap ? attribute['data-flexWrap'] = flexWrap : "";
      justifyContent ? attribute['data-justifyContent'] = justifyContent : "";
      alignItems ? attribute['data-alignItems'] = alignItems : "";
      alignContent ? attribute['data-alignContent'] = alignContent : "";
      return (
         <div className={FLEXBOX_CLASSNAME} {...attribute} {...restProps} >
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

class FlexItem extends React.Component {
   constructor(props){
      super(props);
   }

   render() {
      const {order, flexGrow, flexShrink, flexBasis, flex, alignSelf, style, ...restProps} = this.props;
      console.log(order);
      const newStyle = style ? style : {};
      order != undefined ? newStyle['order'] = order : "";
      flexGrow != undefined ? newStyle['flexGrow'] = flexGrow : "";
      flexShrink != undefined ? newStyle['flexShrink'] = flexShrink : "";
      flex != undefined ? newStyle['flex'] = flex : "";
      alignSelf != undefined ? newStyle['alignSelf'] = alignSelf : "";
      flexBasis != undefined ? newStyle['flexBasis'] = flexBasis : "";

      return (
         <div className={FLEXITEM_CLASSNAME} {...restProps} style={newStyle}>
            {this.props.children}
         </div>
      )

   }
}

const PREFIX = 'beehive';
const FLEXBOX_CLASSNAME = `${PREFIX}-flex-box`;
const FLEXITEM_CLASSNAME = `${PREFIX}-flex-item`;

module.exports={
   FlexBox,
   FlexItem
}