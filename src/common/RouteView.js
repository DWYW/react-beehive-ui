import BHUtil from 'beehive/util/BHUtil';
import Cookie from 'common/Cookie';
import React from 'react'
import {Route, Redirect} from 'react-router-dom'

class RouteView extends React.Component {
   render() {
      const privateRoutes = [], publicRoutes = [];
      const {routes, className} = this.props;

      routes.map((route) => {
         route.private ? privateRoutes.push(route) : publicRoutes.push(route);
      })

      return (
         <div className={BHUtil.combineClassnames('beehive-route-view',className)}>
            {publicRoutes.map((route) => (
               <Route path={route.path} key={route.path} exact={route.exact} component={route.component}/>
            ))}

            {privateRoutes.map((route) => (
               <Route path={route.path} key={route.path} exact={route.exact} render={(props) => (
                  Cookie.getCookie('username') ? (
                     <route.component {...props} routes={route.childrens} params={route.params}/>
                  ) : (
                     <Redirect to={{
                        pathname: '/login',
                        state: {from: props.location}
                     }}/>
                  )
               )} />

            ))}

         </div>
      )
   }
}

export default RouteView