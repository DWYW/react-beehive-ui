import React from "react";

class FixedHeadComponent extends React.Component {
   render() {
      return (
         <div className="fixed-header">
            <a href="http://www.jmc.com.cn/" className="jmc-logo-1">
             <img src="static/logo_head_1.jpg"/>
             </a>

            <img className="jmc-logo-2" src="static/logo_head_2.jpg"/>
         </div>
      )
   }
}

export default FixedHeadComponent;