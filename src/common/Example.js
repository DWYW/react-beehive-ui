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
                  <FlexItem className={'col-xs-12 example-example'}>{this.props.children}</FlexItem>
                  <FlexItem className={'col-xs-12 example-code'}>{this.props.code}</FlexItem>
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