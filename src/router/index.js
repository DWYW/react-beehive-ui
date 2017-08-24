import Bundle from '../common/Bundle';
import React from 'react';

// Async load component.
import App from 'bundle-loader?lazy&name=[name]!../App.js';
import MyFriendIndex from 'bundle-loader?lazy&name=[name]!../MyFriendIndex.js';
import RankListComponent from 'bundle-loader?lazy&name=[name]!../RankListComponent.js';
import PresentGiftComponent from 'bundle-loader?lazy&name=[name]!../PresentGiftComponent.js';

const GetContainers = (component) => {
   return () => (<Bundle load={component}>{(Containers) => <Containers />}</Bundle>)
}

const routes = [{
   path: '/',
   exact: true,
   component: GetContainers(App),
   private: false,
   params: {},
}, {
   path: '/myfriend',
   component: GetContainers(MyFriendIndex),
   private: false,
   params: {},
}, {
   path: '/rank',
   component: GetContainers(RankListComponent),
   private: false,
   params: {},
}, {
   path: '/presentgift',
   component: GetContainers(PresentGiftComponent),
   private: false,
   params: {},
}]

module.exports = routes