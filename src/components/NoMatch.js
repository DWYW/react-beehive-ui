import React from "react"

class NoMatch extends React.Component {
   render() {
      return (
         <div className="not-find-page-container">
            <div className="img-container">
               <img src="static/system/404.png"/>
            </div>
            <h2 className="text-center">Page not found!</h2>
            <p className="text-center">The page can not be viewed or does not exist</p>
            <p className="text-center">Wrong address entered </p>
            <p className="text-center">Page redefinition or program error</p>
         </div>
      )
   }
}

export default NoMatch