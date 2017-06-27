import navigations from './NavConfig';
import {FlexBox, FlexItem} from 'beehive';
import NavTree from './NavTree'
import React from 'react';

class Navigation extends React.Component {
   constructor(props) {
      super(props);
   }

   render() {

      return (
         <FlexBox className="navigation">
            <FlexItem className="col-xs-12" style={{paddingTop: '30px'}}>
               <NavTree data={navigations}></NavTree>
            </FlexItem>
         </FlexBox>
      )
   }
}

export default Navigation