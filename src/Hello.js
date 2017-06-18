import React from "react"

export default class Hello extends React.Component {
   constructor(props) {
      super(props);
      this.className = "Hello";
   }

   render() {
      return (
         <div>Hello</div>
      )
   }
}