import React from "react"
import {Route, Link} from 'react-router-dom'

export default class App extends React.Component {
   constructor(props) {
      super(props);
      this.className = "app";
   }

   render() {
      return (
         <div className="beehive-app">

            <h2>app</h2>

         </div>
      )
   }
}