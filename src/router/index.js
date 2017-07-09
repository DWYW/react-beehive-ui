import App from '../App';
import ButtonComponent from '../components/ButtonComponent';
import GridComponent from '../components/GridComponent';

import Test from '../Test'
import Hello from '../Hello'
import Welcome from '../Welcome'
import Default from '../Default'

const routes = [{
   path: '/',
   exact: true,
   component: App,
   params: {
      classname: 'App'
   },
}, {
   path: '/flexgrid',
   component: GridComponent,
   params: {
      classname: 'GridComponent'
   },
}, {
   path: '/button',
   component: ButtonComponent,
   params: {
      classname: 'ButtonComponent'
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