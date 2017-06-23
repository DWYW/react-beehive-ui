import React from 'react'
import reactDom from 'react-dom'
import {HashRouter as Router} from 'react-router-dom'
import routes from './router'
import RouteView  from './common/RouteView'

import {Provider} from 'react-redux'
import store from './store'
import './styles/index.less'
import './styles/index.scss'
reactDom.render(
   <Provider store={store}>
      <Router>
         <div>
            <ul>
             test
            </ul>
            <hr/>
            <RouteView routes={routes}></RouteView>
         </div>
      </Router>
   </Provider>,
   document.getElementById('app')
)