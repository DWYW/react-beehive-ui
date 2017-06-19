import React from 'react'
import PropTypes from 'prop-types'
import './BeehiveGrid.less'

class BeehiveGrid extends React.Component {
   constructor(props) {
      super(props);
   }

   render() {
      return (
         <div className={GRID_CLASSNAME}>
         {this.props.children}
         </div>
      )
   }
}

const GRID_CLASSNAME = 'beehive-grid';

export default BeehiveGrid