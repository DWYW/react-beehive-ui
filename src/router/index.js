import Bundle from '../common/Bundle';
import React from 'react';

// Sync load component.
import App from '../App';

// Async load component.
import ButtonComponent from 'bundle-loader?lazy&name=[name]!../components/ButtonComponent.js';
import GridComponent from 'bundle-loader?lazy&name=[name]!../components/GridComponent.js';
import InputComponent from 'bundle-loader?lazy&name=[name]!../components/InputComponent.js';
import CheckBoxComponent from 'bundle-loader?lazy&name=[name]!../components/CheckBoxComponent.js';
import NotificationComponent from 'bundle-loader?lazy&name=[name]!../components/NotificationComponent.js';
import SelectComponent from 'bundle-loader?lazy&name=[name]!../components/SelectComponent.js';

import Test from 'bundle-loader?lazy&name=[name]!../Test.js';

// import Test from '../Test'
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
   params: {},
}, {
   path: '/flexgrid',
   component: GetContainers(GridComponent),
   params: {},
}, {
   path: '/button',
   component: GetContainers(ButtonComponent),
   params: {},
}, {
   path: '/input',
   component: GetContainers(InputComponent),
   params: {},
},  {
   path: '/checkbox',
   component: GetContainers(CheckBoxComponent),
   params: {},
},  {
   path: '/notification',
   component: GetContainers(NotificationComponent),
   params: {},
},  {
   path: '/select',
   component: GetContainers(SelectComponent),
   params: {},
}, {
   path: '/welcome',
   component: Welcome,
   params: {},
   childrens: [{
      path: '/welcome/',
      component: Default,
      exact: true,
      params: {}
   }, {
      path: '/welcome/default',
      component: Default,
      params: {}
   }, {
      path: '/welcome/test',
      component: GetContainers(Test),
      params: {}
   }]
}, {
   path: '/hello',
   component: Hello,
   params: {}
}]

module.exports = routes