import React from "react"
import {Link} from 'react-router-dom'
import RouteView from './common/RouteView'
export default class Welcome extends React.Component {
   constructor(props) {
      super(props);
      this.className = "Welcome";
   }

   render() {
      return (
         <div>
            <ul>
               <li><Link to="/welcome/default">default</Link></li>
               <li><Link to="/welcome/test">test</Link></li>
            </ul>
            <hr/>
            <RouteView routes={this.props.routes}></RouteView>
         </div>
      )
   }
}