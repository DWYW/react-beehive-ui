import Navigation from './components/navigation/Navigation';
import routes from './router';
import RouteView  from './common/RouteView';
import store from './store';
import {HashRouter as Router} from 'react-router-dom';
import {Provider} from 'react-redux';
import React from 'react';
import reactDom from 'react-dom';

import './styles/index.less';

reactDom.render(
   <Provider store={store}>
      <Router>
         <div className={'root-route-view'}>
            <Navigation />
            <RouteView routes={routes}></RouteView>
         </div>
      </Router>
   </Provider>,
   document.getElementById('app')
)