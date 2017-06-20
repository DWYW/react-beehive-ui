import React from 'react'
import PropTypes from 'prop-types'
import './BeehiveGrid.less'

class FlexBox extends React.Component {
   constructor(props) {
      super(props);
   }

   componentDidMount() {

   }

   render() {
      const {flexDirection, flexWrap, justifyContent, alignItems, alignContent, ...restProps} = this.props;
      return (
         <div
            className={GRID_CLASSNAME}
            data-flexDirection={flexDirection ? flexDirection : false}
            data-flexWrap={flexWrap ? flexWrap : false}
            data-justifyContent={justifyContent? justifyContent : false}
            data-alignItems={alignItems? alignItems : false}
            data-alignContent={alignContent? alignContent : false}
            {...restProps}
         >
         {this.props.children}
         <div className="grid-1"></div>
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

const PREFIX = 'beehive-';
const GRID_CLASSNAME = `${PREFIX}grid`;

export default FlexBox