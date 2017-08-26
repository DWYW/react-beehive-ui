import React from "react"

export default class Hello extends React.Component {
   constructor(props) {
      super(props);
      this.className = "Hello";
   }

   a = () => {
      console.log('a');

      function A() {
         this.a = "A";
      }
      function B() {
         this.b = "B";
      }

      function Animal(name) {
         this.name = name;
         A.apply(this);
         B.apply(this);
      }

      const cat = new Animal('cat');
      console.log(cat)
   }

   b = (fun) => {
      console.log('b');
      fun;
   }

   render() {
      this.b(this.a(1,2))
      return (
         <div>Hello</div>
      )
   }
}