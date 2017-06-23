import React from 'react'
import {Route} from 'react-router-dom'

function RouteView(routes){
   return (
      <div className="beehive-route-view">
         {routes.routes.map((route) => (
            <Route path={route.path} key={route.path} exact={route.exact} render={props => (
               <route.component {...props} routes={route.childrens} params={route.params}/>
            )}/>
         ))}
      </div>
   )
}

export default RouteView