import React from "react"
import {connect} from 'react-redux'
import * as test from './store/actions/test'

class Text extends React.Component {
   constructor(props) {
      super(props);
   }

   render() {
      return (
         <div>
            {this.props.children}
         </div>
      )
   }
}

class Test extends React.Component {
   constructor(props) {
      super(props);
      this.className = "Test";
   }

   render() {
      // console.log(this.props.state)
      return (
         <div>
            <h1>{this.props.num}</h1>
            <div>
               <button onClick={this.props.increase}></button>
            </div>
            <Text><a href="http://www.baidu.com">baidu</a></Text>
         </div>
      )
   }
}
// console.log(test)
function mapStateToProps(state) {
  return {
   num: state.test
  }
}
module.exports = connect(mapStateToProps,test)(Test)