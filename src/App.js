import React from "react"
// import {Route, Link} from 'react-router-dom'

import {FlexBox, FlexItem, FieldClick} from './beehive/'
import utils from './common/utils/'

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
      console.log(utils.string.removeStringBlanks('  sfsf-sf ',false));
      let a = {a: 'a', c: 4};
      let b = {b: 'b', c: 8};
      a = utils.object.assignOwnProperty(a,b);
      console.log(a);
      b.c = 10;
      console.log(a);
      console.log(b);

      return (
         <div className="beehive-app">

            <h2>{this.state.count}</h2>
            <FlexBox onClick={()=>{this._callback()}} style={{width: '100%'}} flexDirection="wrap">
               <FlexItem style={{backgroundColor: 'red'}}>22342</FlexItem>
               <FlexItem style={{backgroundColor: 'green'}}>22342<br/>werwe</FlexItem>
            </FlexBox>

            <div style={{width: '120px', border: '1px solid #ccc'}}>
               <FieldClick>button</FieldClick>
            </div>

         </div>
      )
   }
}