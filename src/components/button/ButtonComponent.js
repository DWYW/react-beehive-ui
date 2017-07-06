import Example from 'common/Example';
import {BHButton} from 'beehive';
import React from 'react';
import PropTypes from 'prop-types';

class ButtonComponent extends React.Component {
   constructor(props) {
      super(props);
   }

   render() {
      return (
         <div>
            <Example title={"button"} code={"<BHButton>buttton</BHButton>"}>
               <BHButton>buttton</BHButton>
            </Example>
         </div>
      )
   }
}

export default ButtonComponent