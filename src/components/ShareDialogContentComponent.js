import React from 'react';

class ShareDialogContentComponent extends React.Component {
   constructor(props) {
      super(props);
   }

   render() {
      return (
         <div className="share-dialog-component">
            <div className="share-dialog-component-body">
               <img src="static/system/share_line.png" className="share-line"/>
               <div className="share-dialog-component-content text-center">
                  告诉好友，我在攒玫瑰 <br/> 看看玫瑰的数量会疯涨多少
               </div>
               <div className="close-btn">
                  <i className="iconfont icon-close" onClick={this.hideDialog}></i>
               </div>
            </div>
         </div>
      )

   }

   /**
    * Share dialog is hide.
    */
   hideDialog = () => {
      if(this.props.cancel) {
         this.props.cancel()
      }
   }
}

export default ShareDialogContentComponent;