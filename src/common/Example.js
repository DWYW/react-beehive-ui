import React from 'react';
import PropTypes from 'prop-types';
import {FlexBox, FlexItem} from 'beehive';

class Example extends React.Component {
   constructor(props) {
      super(props);
   }

   render() {
      return (
         <div className="base-example">
            <h2>{this.props.title}</h2>
            <div className="example-container">
               <FlexBox>
                  <FlexItem>{this.props.children}</FlexItem>
                  <FlexItem>{this.props.code}</FlexItem>
               </FlexBox>
            </div>
         </div>
      )
   }
}

Example.propTypes = {
   title: PropTypes.string,
   code: PropTypes.string
}

export default Example