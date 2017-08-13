import Dialog from './Dialog';
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
   <Dialog/>,
   dialogContainer
)

const addDialog = () => {
   return (opts={}) => {
      opts.id = "dialog" + new Date().getTime() + Math.random().toString().substring(2);

      if(opts.confirm === undefined) {
         opts.confirm = (id) => {
            dialog.removeDialog(id);
         };
      }

      dialog.addDialog(opts);
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