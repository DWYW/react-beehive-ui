import UIUtil from './utils/UIUtil';
import Cookie from 'common/Cookie';
import React from 'react';
import {Route, Redirect, Switch} from 'react-router-dom';

const defaultPathName = '/login'

class RouteView extends React.Component {
   render() {
      const privateRoutes = [], publicRoutes = [], noMatchRoutes = [];
      const {routes, className} = this.props;

      routes.map((route) => {
         route.path ? route.private ?  privateRoutes.push(route) : publicRoutes.push(route) : noMatchRoutes.push(route);
      })

      return (
         <div className={UIUtil.combineClassnames('beehive-route-view',className)}>
            <Switch>
               {publicRoutes.map((route) => (
                  <Route path={route.path} key={route.path} exact={route.exact} component={route.component}/>
               ))}

               {privateRoutes.map((route) => (
                  <Route path={route.path} key={route.path} exact={route.exact} render={(props) => (
                     Cookie.getCookie('username') ? (
                        <route.component {...props} routes={route.childrens} params={route.params}/>
                     ) : (
                        <Redirect to={{
                           pathname: defaultPathName,
                           state: {from: props.location}
                        }}/>
                     )
                  )} />

               ))}

               {noMatchRoutes.map((route, key) => (
                  <Route key={`noMatchRoutes${key}`} component={route.component}/>
               ))}
            </Switch>
         </div>
      )
   }
}

export default RouteView