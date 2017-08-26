import React from 'react';

class GDialog extends React.Component {
   constructor(props) {
      super(props);

      this.state = {
         dialog: {}
      }
   }

   /**
    * Create dialog.
    */
   createDialog = () => {
      const dialog = this.state.dialog;

      return Object.keys(dialog).map((key) => {
         const {id, content, showClose} = dialog[key];

         return (
            <div className={'dialog'} key={id}>
               <div className="dialog-content">
                  <div className="dialog-body">
                     {content}
                  </div>
                  {showClose &&
                     <div className="dialog-close">
                        <i className="iconfont icon-close" onClick={()=>this.removeDialog(id)}></i>
                     </div>
                  }
               </div>
            </div>
         );
      })
   }

   render() {
      const dialog = this.state.dialog;
      return (
         <div className="dialog-container">
            {Object.keys(dialog).length > 0 ? this.createDialog() : null}
         </div>
      );
   }

   /**
    * Mount dialog size.
    */
   addDialog = (opts) => {
      const dialog = this.state.dialog;
      dialog[opts.id] = opts;
      dialog[opts.id].isShow  = true;

      this.setState({
         dialog: dialog
      })

      if(!document.body.classList.contains(BODY_HIDE_CLASS)) {
         document.body.classList.add(BODY_HIDE_CLASS);
         document.getElementsByTagName("html")[0].classList.add(BODY_HIDE_CLASS);
      }
   }

   /**
    * Mount dialog size.
    */
   mountDialogSize = (rect) => {
      let style = {};
      const {width, height} = rect;
      style.width = `${width}px`;
      style.height = height ? `${height}px` : null;
      style.marginLeft = `-${width/2}px`;
      style.marginTop = height? `-${height/2}px` : `-${50}%`;

      return style;
   }

   /**
    * Remove dialog.
    */
   removeDialog = (id) => {
      const dialog = this.state.dialog;

      if(!dialog[id]) {
         return null
      }

      dialog[id].cancel ? dialog[id].cancel(id) : null;
      delete dialog[id];

      this.setState({
         dialog: dialog
      })

      if(document.body.classList.contains(BODY_HIDE_CLASS)) {
         document.body.classList.remove(BODY_HIDE_CLASS);
         document.getElementsByTagName("html")[0].classList.remove(BODY_HIDE_CLASS);
      }
   }

   /**
    * Remove dialog.
    */
   removeAll = () => {
      const dialog = {};
      this.setState({
         dialog: dialog
      })

      if(document.body.classList.contains(BODY_HIDE_CLASS)) {
         document.body.classList.remove(BODY_HIDE_CLASS);
         document.getElementsByTagName("html")[0].classList.remove(BODY_HIDE_CLASS);
      }
   }

   /**
    * confirm dialog.
    */
   dialogConfirm = (id) => {
      const dialog = this.state.dialog;
      dialog[id].confirm ? dialog[id].confirm(id) : null;
   }

}

const BODY_HIDE_CLASS = "body-overflow-hide";

export default GDialog