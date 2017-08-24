import GDialog from './GDialog';
import React from 'react';
import reactDOM from 'react-dom';

let dialogContainer = null;

if(document.getElementById('dialogContainer')) {
   dialogContainer = document.getElementById('dialogContainer');
}
else {
   dialogContainer = document.createElement("div");
   dialogContainer.id = "dialogContainer";
   document.body.appendChild(dialogContainer);
}

const dialog = reactDOM.render(
   <GDialog/>,
   dialogContainer
)

const addDialog = () => {
   return (opts={}) => {
      opts.id = "dialog" + new Date().getTime() + Math.random().toString().substring(2);
      opts.type = opts.type || "dialog";
      opts.showClose = opts.showClose == undefined ? true : opts.showClose;
      dialog.addDialog(opts);

      if(opts.callback) {
         opts.callback(opts.id);
      }
   }
}

const removeDialog = () => {
   return (id) => {
      dialog.removeDialog(id);
   }
}

const removeAll = () => {
   return () => {
      dialog.removeAll();
   }
}

export default {
   addDialog: addDialog(),
   removeDialog: removeDialog(),
   removeAll: removeAll()
}