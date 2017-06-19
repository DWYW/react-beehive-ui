// import React from 'react'
// import {Route} from 'react-router-dom'
import App from '../App'
// import Test from '../Test'
// import Hello from '../Hello'
// import Welcome from '../Welcome'
// import Default from '../Default'

// const routes = [{
//    path: '/',
//    exact: true,
//    component: App,
//    params:{classname:'App'}
// },{
//    path: '/welcome',
//    component: Welcome,
//    params:{classname:'Welcome'},
//    childrens:[{
//       path: '/welcome/',
//       component: Default,
//       exact:true,
//       params:{classname:'Default'}
//    },{
//       path: '/welcome/default',
//       component: Default,
//       params:{classname:'Default'}
//    },{
//       path: '/welcome/test',
//       component: Test,
//       params:{classname:'Test'}
//    }]
// },{
//    path: '/hello',
//    component: Hello,
//    params:{classname:'Hello'}
// }]

const routes = [{
   path: '/',
   exact: true,
   component: App,
   params:{classname:'App'}
}]

module.exports = routes