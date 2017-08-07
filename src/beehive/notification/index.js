import React from 'react'
import reactDOM from 'react-dom'
import Contents from './contents.js'

let notificationContainer;

if(document.getElementById('notificationContainer')) {
   notificationContainer = document.getElementById('notificationContainer');
}
else {
   notificationContainer = document.createElement('div');
   notificationContainer.id = "notificationContainer";
}

document.body.appendChild(notificationContainer);
const contents = reactDOM.render(
   <Contents></Contents>,
   notificationContainer
);

function create(type) {
   return (content, opts = {}) => {
      if (type) {
         opts.type = type
      }

      opts.id = "notification" + new Date().getTime() + Math.random().toString().substring(2);
      opts.content = content;
      opts.showIcon = opts.showIcon !== undefined ? opts.showIcon !== false && opts.showIcon !== true ? true : opts.showIcon : false;
      opts.showClose = opts.showClose !== undefined ? opts.showClose !== false && opts.showClose !== true ? false : opts.showClose : true;
      opts.duration = opts.duration !== undefined ?
         opts.showClose ? parseInt(opts.duration) : parseInt(opts.duration) === 0 ? 5 : parseInt(opts.duration) : 5;
      contents.addMessage(opts)
   }
}

export default {
   default: create('default'),
   success: create('success'),
   primary: create('primary'),
   error: create('error'),
   warn: create('danger')
}