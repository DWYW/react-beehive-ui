import Cookie from 'common/Cookie';
// import md5 from 'blueimp-md5';
import {BHButton, BHInput, BHCheckBox} from 'beehive';
import React from 'react';
import {Redirect} from 'react-router-dom'
import {withRouter} from 'react-router'

class LoginComponent extends React.Component {
   constructor(props) {
      super(props);

      this.state = {
         logined: false,
         logining: false,
         username: "",
         password: "",
         memoryPW: false
      }
   }

   componentWillMount() {
      if(Cookie.getCookie('userInfo.username') && Cookie.getCookie('userInfo.password')) {
         const st = {};
         st['username'] = Cookie.getCookie('userInfo.username');
         st['password'] = Cookie.getCookie('userInfo.password');
         st['memoryPW'] = true;
         this.setState(st);
      }
   }

   render() {
      const {logined, logining, memoryPW, username, password} = this.state;
      const from = this.props.location.state ? this.props.location.state.from : {pathname: '/'};

      if(logined) {
         return <Redirect to={from}/>
      }

      return (
         <div className={'loginComponent'}>
            <div className="form-container">
               <div className="form-body">
                  <div className="system-title">BEEHIVE UI</div>
                  <div className="row">
                     <BHInput className="login-ghost-input" placeholder="用户名" nextIcon="icon-zhanghao"
                        onChange={this.usernameOnChange} value={username}/>
                  </div>
                  <div className="row">
                     <BHInput className="login-ghost-input mgn-b15px" type="password" placeholder="登录密码"
                        nextIcon="icon-zhanghaomima-" onChange={this.passwordOnChange} value={password}/>
                  </div>
                  <div className="row">
                     <BHCheckBox className="login-ghost-checkbox" iconType="ghost" iconStyle={{color: "rgba(255, 255, 255, 0.7)"}}
                        checked={memoryPW} onChange={this.memoryOnChange}>
                        记住密码
                     </BHCheckBox>
                  </div>
                  <div className="row">
                     <BHButton className="warning loginBtn" onClick={this.handleLogin}>{logining ? '登录中···' : '登录'}</BHButton>
                  </div>
               </div>
            </div>
         </div>
      )
   }

   /**
    * Get username input value.
    */
   usernameOnChange = (e) => {
      this.setState({username: e.target.value})
   }

   /**
    * Get password input value.
    */
   passwordOnChange = (e) => {
      const password =  e.target.value;
      this.setState({password})
   }

   /**
    * Get password input value.
    */
   memoryOnChange = (e) => {
      const memoryPW = e.target.checked
      this.setState({memoryPW})
   }

   /**
    * Get password input value.
    */
   handleLogin = () => {
      const {username, password, logining, memoryPW} = this.state;
      if(!username) {
         console.log("input username");
         return false;
      }

      if(!password) {
         console.log("input password");
         return false;
      }

      if(!logining) {
         this.setState({logining: true})
      }

      setTimeout(() => {
         if(memoryPW) {
            Cookie.setCookie('userInfo.username', username, 60);
            Cookie.setCookie('userInfo.password', password, 60);
         }

         Cookie.setCookie('username', username);
         this.setState({
            logined: true
         })
      },2000)
   }

}

export default withRouter(LoginComponent)
