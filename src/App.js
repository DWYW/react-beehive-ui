import React from "react"
import {Route, Link} from 'react-router-dom'

import {FlexBox} from './beehive/'

export default class App extends React.Component {
   constructor(props) {
      super(props);
      this.className = "app";
      this.test1 = "ewerwq";
      this.test2 = "wrw";
      this._callback = this._callback.bind(this);
      this.count = 0;
   }
   _callback(){

      setTimeout(()=>{this.count++;console.log(this.count);},2000)
   }
   render() {
      console.log(`${this.test1}
         ${this.test2}`)
      return (
         <div className="beehive-app">

            <h2>app</h2>
            <FlexBox onClick={()=>{this._callback()}} style={{width:'100px'}} flexDirection="row">
               <div>22342</div>
               <div>22342<br/>werwe</div>
               <div>22342<br/>werwe</div>
               <div>22342<br/>werwe<br/>werwe<br/>werwe</div>
               <div>22342<br/>werwe</div>
               <div>22342</div>
            </FlexBox>

         </div>
      )
   }
}