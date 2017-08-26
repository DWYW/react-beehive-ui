import React from 'react'

class Notification extends React.Component {
   constructor(props) {
      super(props);
      this.addMessage = this.addMessage.bind(this);
      this.removeMessage = this.removeMessage.bind(this);
      this.dismiss = this.dismiss.bind(this);
      this.state = {
         messages: {}
      };
   }

   addMessage(opts) {
      const messages = this.state.messages;
      messages[opts.id] = opts;

      if(opts.duration > 0) {
         messages[opts.id].timeout = setTimeout(() => {
            this.dismiss(opts.id)
         }, opts.duration * 1000)
      }

      this.setState({
         messages
      })
   }

   dismiss(id) {
      const messages = this.state.messages;
      clearTimeout(messages[id].timeout);
      messages[id].duration = -1;

      this.setState({
         messages
      })

      setTimeout(() => {
         this.removeMessage(id)
      }, 600)
   }

   removeMessage(id) {
      const messages = this.state.messages;
      delete messages[id];
      this.setState({
         messages
      })
   }

   clearAllMessage() {
      const messages = this.state.messages;
      Object.keys(messages).map((key) => {
         this.dismiss(key)
      })
   }

   _createMessages = () => {
      const messages = this.state.messages;
      return  Object.keys(messages).map((key) => {
         const {type,duration, showIcon, showClose} = messages[key]
         return (
            <div key={key}
               className={duration >= 0 ? "bounceInRight s-notification-item s-notification-item-" + type : "bounceOutRight s-notification-item s-notification-item-" + type}
               style={showIcon ? showClose ? {paddingLeft: "3.2em"} : {
                  paddingLeft: "3.2em",
                  paddingRight: "1em"
               } : showClose ? {} : {paddingRight: "1em"}}>
               {messages[key].content}
               {showClose &&
                  <span className="s-notification-close" onClick={() => {
                     this.dismiss(key)
                  }}>×</span>
               }
               {showIcon &&
                  <div className="s-notification-icon-section">
                     {type === 'success' &&
                        <i className="iconfont icon-circle-success"></i>
                     }
                     {type !== 'success' &&
                        <i className="iconfont icon-info"></i>
                     }
                  </div>
               }
            </div>
         )
      })
   }

   render() {
      return (
         <div className="s-notification">
            {
               <div className="s-notification-section">
                  {this._createMessages()}
               </div>
            }
         </div>)
   }
}
export default Notification