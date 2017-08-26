import React from "react"

export default class Default extends React.Component {
   constructor(props) {
      super(props);
      this.className = "Default";
   }

   render() {
      return (
         <div>{this.props.match.url}</div>
      )
   }
}