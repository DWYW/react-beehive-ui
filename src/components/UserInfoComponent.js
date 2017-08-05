import Cookie from 'common/Cookie';
import React from 'react';
import {Redirect} from 'react-router-dom';

class UserInfoComponent extends React.Component {
   constructor(props) {
      super(props);

      this.state = {
         username: ""
      }
   }

   componentWillMount() {
      const username = Cookie.getCookie('username');
      this.setState({username})
   }

   render() {
      if(!this.state.username) {
         return <Redirect to='/login' />
      }

      return (
         <div className="userinfo-container">
            <span>欢迎{this.state.username}</span> <i className="iconfont icon-exit2" onClick={this.systemExit}></i>
         </div>
      )
   }

   /**
    * System exit.
    */
   systemExit = () => {
      Cookie.rmCookie("username");
      if(!Cookie.getCookie('username')) {
         this.setState({username: ""})
      }
   }
}

export default UserInfoComponent