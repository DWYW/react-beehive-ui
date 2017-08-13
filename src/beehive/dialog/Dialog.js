// import BHUtil from '../util/BHUtil';
import BHButton from '../button/BHButton';
import React from 'react';

class Dialog extends React.Component {
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
         const {id, title, content, cancel, confirm, width, height} = dialog[key];
         const bodyHeight = (height || Dialog.defaultSize.height) - (cancel || confirm ?  80 : 40);
         const selfSize= {
            width: width || Dialog.defaultSize.width,
            height: height || Dialog.defaultSize.height
         }

         return (
            <div className={'dialog'} key={id}>
               <div className="mask"></div>
               <div className="dialog-container" ref={`dialog${key}`}
                  style={Object.assign({}, this.mountDialogSize(Dialog.defaultSize), this.mountDialogSize(selfSize))}>
                  <div className="dialog-head">
                     {title || '提示信息'}
                     <BHButton className="dialog-close" style={dialogCloseBtnStyle}
                        onClick={()=>this.removeDialog(id)}>×</BHButton>
                  </div>

                  {content &&
                     <div className="dialog-body" style={{height: `${bodyHeight}px`}}>
                        {content instanceof Function ? content() : content}
                     </div>
                  }

                  {(cancel || confirm) &&
                     <div className="dialog-footer">
                        {cancel &&
                           <BHButton style={dialogBtnStyle} onClick={()=>this.removeDialog(id)}>取消</BHButton>
                        }
                        {confirm &&
                           <BHButton className={cancel ? "primary" : "default"} style={dialogBtnStyle} onClick={()=>this.dialogConfirm(id)}>确定</BHButton>
                        }
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
         <div>
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
   }

   /**
    * Remove dialog.
    */
   removeAll = () => {
      const dialog = {};
      this.setState({
         dialog: dialog
      })
   }

   /**
    * confirm dialog.
    */
   dialogConfirm = (id) => {
      const dialog = this.state.dialog;
      dialog[id].confirm ? dialog[id].confirm(id) : null;
   }

}

Dialog.defaultSize = {
   width: 320,
   height: 160

}

const dialogBtnStyle = {
   minWidth: '60px',
   height: '24px',
   fontSize: "13px"
}

const dialogCloseBtnStyle = {
   minWidth: '0px',
   width: '18px',
   height: '18px',
   borderRadius: "50%",
   borderColor: "transparent",
   fontSize: '18px',
   float: 'right',
   marginRight: "-5px",
}

export default Dialog