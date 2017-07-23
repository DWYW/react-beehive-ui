import React from 'react'
import reactDOM from 'react-dom'
import Contents from './contents.js'

const div = document.createElement('div');
document.body.appendChild(div);
const contents = reactDOM.render(
   <Contents></Contents>,
   div
);

function create(type) {
   return (content, opts = {}) => {
      if (type) {
         opts.type = type
      }
      opts.id = new Date().getTime();
      opts.content = content;
      opts.icon = opts.icon !== undefined ? opts.icon !== false && opts.icon !== true ? true : opts.icon : false;
      opts.close = opts.close !== undefined ? opts.close !== false && opts.close !== true ? false : opts.close : true;
      opts.duration = opts.duration !== undefined ? opts.close ? opts.duration : 5 : 5;
      contents.addMessage(opts)
   }
}

export default {
   default: create('default'),
   success: create('success'),
   primary: create('primary'),
   error: create('error'),
   danger: create('danger')
}