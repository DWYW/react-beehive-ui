import Cookie from 'common/Cookie';
import Navigation from './components/navigation/Navigation';
import UserInfoComponent from './components/UserInfoComponent';
import routes from './router';
import RouteView  from './common/RouteView';
import store from './store';
import {HashRouter as Router} from 'react-router-dom';
import {Provider} from 'react-redux';
import React from 'react';
import reactDom from 'react-dom';

import './styles/index.less';

class Root extends React.Component {
   render() {
      return (
         <div className={'root-route-view'}>
            {Cookie.getCookie('username') &&
               <Navigation/>
            }

            {Cookie.getCookie('username') &&
               <UserInfoComponent/>
            }

            <RouteView className={Cookie.getCookie('username') ? "padding180px" : ""} routes={routes} />
         </div>
      )
   }
}

reactDom.render(
   <Provider store={store}>
      <Router>
         <Root></Root>
      </Router>
   </Provider>,
   document.getElementById('app')
)