import Bundle from '../common/Bundle';
import React from 'react';

// Sync load component.
import App from '../App';

// Async load component.
import ButtonComponent from 'bundle-loader?lazy&name=[name]!../components/ButtonComponent.js';
import GridComponent from 'bundle-loader?lazy&name=[name]!../components/GridComponent.js';
import InputComponent from 'bundle-loader?lazy&name=[name]!../components/InputComponent.js';

import Test from '../Test'
import Hello from '../Hello'
import Welcome from '../Welcome'
import Default from '../Default'

const GetContainers = (component) => {
   return () => (<Bundle load={component}>{(Containers) => <Containers />}</Bundle>)
}

const routes = [{
   path: '/',
   exact: true,
   component: App,
   params: {
      classname: 'App'
   },
}, {
   path: '/flexgrid',
   component: GetContainers(GridComponent),
   params: {
      classname: 'GridComponent'
   },
}, {
   path: '/button',
   component: GetContainers(ButtonComponent),
   params: {
      classname: 'ButtonComponent'
   },
}, {
   path: '/input',
   component: GetContainers(InputComponent),
   params: {
      classname: 'InputComponent'
   },
}, {
   path: '/welcome',
   component: Welcome,
   params: {
      classname: 'Welcome'
   },
   childrens: [{
      path: '/welcome/',
      component: Default,
      exact: true,
      params: {
         classname: 'Default'
      }
   }, {
      path: '/welcome/default',
      component: Default,
      params: {
         classname: 'Default'
      }
   }, {
      path: '/welcome/test',
      component: Test,
      params: {
         classname: 'Test'
      }
   }]
}, {
   path: '/hello',
   component: Hello,
   params: {
      classname: 'Hello'
   }
}]

module.exports = routes