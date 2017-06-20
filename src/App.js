import React from "react"
import {Route, Link} from 'react-router-dom'

import {FlexBox, FlexItem} from './beehive/'

export default class App extends React.Component {
   constructor(props) {
      super(props);
      this.className = "app";
      this.test1 = "ewerwq";
      this.test2 = "wrw";
      this._callback = this._callback.bind(this);
      this.state = {
         count: 0
      }
   }
   _callback(){

      setTimeout(()=>{
         const count = ++this.state.count;
         this.setState({
            count
         })
      },100)
   }
   render() {
      console.log(`${this.test1}
         ${this.test2}`)
      return (
         <div className="beehive-app">

            <h2>{this.state.count}</h2>
            <FlexBox onClick={()=>{this._callback()}} style={{width:'100px'}} flexDirection="row">
               <FlexItem order={0} flexGrow={0}>22342</FlexItem>
               <FlexItem flexGrow={0}>22342<br/>werwe</FlexItem>
            </FlexBox>

         </div>
      )
   }
}