import {API, isFirstEntry, isFirstScanCode, clearTime, shareTime, tokenName, service} from './service/Api';
import {GDialog} from 'mobileUI/index/';
import {connect} from 'react-redux'
import {withRouter} from 'react-router'
import * as test from './store/actions/test'
import ActiveRuleComponent from './components/ActiveRuleComponent';
import ApiUtil from 'common/utils/ApiUtil';
import FixedHeadComponent from './components/FixedHeadComponent';
import FooterComponent from './components/FooterComponent';
import RegisterComponent from './components/RegisterComponent';
import ShareDialogContentComponent from './components/ShareDialogContentComponent';
import FriendPresentListComponent from './components/FriendPresentListComponent';
import UIUtil from 'common/utils/UIUtil';
import {Modal, Toast} from 'antd-mobile';
import moment from 'moment';
import React from "react";

import './styles/App.less';

class App extends React.Component {
   constructor(props) {
      super(props);
      this._ruleDialog = null;
      this._registerDialog = null;
      this._shareDialog = null;
      this.tokenName = null;
      this.officialId = null;

      this.state = {
         userInfo: null,
         openid: null,
         modalVisible: false,
         orderInfo: null
      }
   }
   componentWillMount() {
      if(!localStorage.getItem(clearTime)) {
         localStorage.clear();
         localStorage.setItem(clearTime, true);
      }

      //react-router 自动跳转redirect_router_path
      if(ApiUtil.getQueryValue("redirect_router_path") && ApiUtil.getQueryValue("redirect_router_path")!=='/') {
         if(ApiUtil.getQueryValue("router_openid")) {
            this.props.history.push({
               pathname: '/presentgift',
               search: `router_openid=${ApiUtil.getQueryValue("router_openid")}`
            })

            return false;
         }

         this.props.history.push({
            pathname: ApiUtil.getQueryValue("redirect_router_path")
         })
         return false
      }

      this.officialId = ApiUtil.getQueryValue("official_id");
      this.tokenName = `${tokenName}${this.officialId}`;
      this.fromOpenId = ApiUtil.getQueryValue("from_openid");
      this.pageFrom = ApiUtil.getQueryValue("page_from");
      ApiUtil.setToken(API, this.tokenName, this.officialId);

      if(ApiUtil.getQueryValue('access_token')) {
         let href = null;

         if(window.location.search.substring(0,1) == "?") {
            href = window.location.href.replace(`&access_token=${ApiUtil.getQueryValue('access_token')}`, '');

         }
         else {
            href = window.location.href.replace(`access_token=${ApiUtil.getQueryValue('access_token')}`, '');
         }

         window.location.href = href;
      }

      if(ApiUtil.getToken(this.tokenName)) {
         this.dataInit();
      }
   }

   componentDidMount() {
      this.pageInit();
   }

   componentWillUnmount() {
      GDialog.removeAll();
   }

   render() {
      const {userInfo, openid} = this.state;

      return (
         <div className="person-index">
            <FixedHeadComponent/>
            <div className="index-container">
               <div className="header-container">
                  <span className="active-rule-btn" onClick={()=>{this.addDialog('rule')}}>
                     <span>活动规则</span> <i className="iconfont icon-info"></i>
                  </span>
               </div>
               <div className="content-container">
                  <div className="content-slogan text-center">赢iPhone7，坐江铃玫瑰花车</div>
                  <div className="person-info text-center">
                     已收到
                     <span className="rose-number">{userInfo ? userInfo.point : 0}</span>
                     朵玫瑰，排名
                     <span className="rank-number">{userInfo ? userInfo.rank : 0}</span>
                     <span className="view-rank-btn" onClick={this.routeToRank}>查看排行榜</span>
                  </div>
                  <div className="share-btn">
                     <div className="share-btn-bg" onClick={this.showShareDialog}></div>
                  </div>

                  <div className="register-btn text-center" onClick={()=>{this.addDialog('register')}}>注册即送999朵玫瑰</div>

                  <div className="text-center"><a className="jmc-skip" href="http://www.jmc.com.cn/">车辆和促销详情请点击</a></div>

                  <FriendPresentListComponent linkTo={true} openId={openid} ownerOpenId={openid} titleImg={FRIEND_PRESENT_LIST_COMPONENT_TITLE} />

                  <FooterComponent/>

               </div>
            </div>
            <Modal
               title={this.state.orderInfo && this.state.orderInfo.title}
               transparent
               maskClosable={false}
               visible={this.state.modalVisible}
               footer={[{text: '确定', onPress: () => {this.hideModal();}}]}
               platform="ios"
            >
               {this.state.orderInfo &&  `您已成功领取${this.state.orderInfo.brand}${this.state.orderInfo.coupon}，
                     请凭手机号码到${this.state.orderInfo.official_name}可以享受每1万朵玫瑰花，直降100元的优惠，每台车最多500元。`}

            </Modal>
         </div>
      )
   }

   /**
    * Data init event.
    */
   dataInit = async () => {
      const wxUserInfo = await service.getWxUserInfo(this.tokenName);
      const userInfo = await service.getUserInfo({
         openid: wxUserInfo.data.open_id,
         official_id: this.officialId
      });

      const openid = wxUserInfo.data.open_id;
      localStorage.setItem("openid", openid);

      this.setState({
         userInfo: userInfo.data,
         openid: localStorage.getItem("openid")
      },() => {
         this.createShare();
      })

      this.dialogInit();
   }

   /**
    * Dialog init event.
    */
   dialogInit = async () => {
      if(!localStorage.getItem(isFirstScanCode) && this.pageFrom == 'scanCode') {
         localStorage.setItem(isFirstScanCode, true);
         const getRose9999 = await service.getRoses({
            official_id: this.officialId,
            openid: this.state.openid,
            type: 15
         })

         if(getRose9999.code === 0 ) {
            localStorage.setItem(isFirstEntry, true);
            this.showRegisterDialog(true);
            return false;
         }
      }

      if(!localStorage.getItem(isFirstEntry)) {
         localStorage.setItem(isFirstEntry, true);
         this.showRuleDialog(true);
      }
   }

   /**
    * Page init event.
    */
   pageInit = () => {
      UIUtil.pageScrollTopTo(0);
   }

   /**
    * Create share event.
    */
   createShare = async () => {
      const signature = await service.getSignature({
         url: window.location.href
      },this.officialId)

      if(signature.code === 0) {
         ApiUtil.shareEvent(signature.data, {
            title: `七夕活动收江铃玫瑰，今天是第 ${ApiUtil.mountDays()} 天，已收到 ${this.state.userInfo.point} 朵`,
            link: `${location.origin}${location.pathname}?official_id=${this.officialId}&from_openid=${this.state.openid}#/myfriend`,
            imgUrl: this.state.userInfo.headimgurl,
            desc: `跟前一名还差一点点，大家来助力帮我赢iPhone`,
            success: () => {
               this.shareSuccess();
            }
         })
      }
   }

   /**
    * Share success.
    */
   shareSuccess = async () => {
      const getRoses = await service.getRoses({
         official_id: this.officialId,
         openid: this.state.openid,
         type: 16
      })

      if(getRoses.code === 0) {
         const prevShareTime  = localStorage.getItem(shareTime);
         const {clueAuth, mobileAuth} = this.state.userInfo;

         if(!prevShareTime) {
            this.shareSuccessShowDialog(clueAuth, mobileAuth);
            return false;
         }

         if(!ApiUtil.isToDay(prevShareTime)) {
            this.shareSuccessShowDialog(clueAuth, mobileAuth);
            return false;
         }

         window.location.reload();
      }
   }

   /**
    * Share success show dialog.
    */
   shareSuccessShowDialog = (clueAuth, mobileAuth) => {
      localStorage.setItem(shareTime, moment().format('YYYYMMDD'));
      if(mobileAuth == 2 || clueAuth == 2) {
         this.showRegisterDialog(true, false, true);
      }
      else {
         Toast.info("签到完成！成功领取800朵玫瑰", 2)
      }
   }

   /**
    * Add dialog event.
    */
   addDialog = (component) => {

      switch(component) {
      case 'rule':
         this.showRuleDialog();
         break;
      case 'register':
         this.showRegisterDialog(false, true, false);
         break;
      default:
         return null
      }
   }

   /**
    * Show rule dialog.
    */
   showRuleDialog = () => {
      GDialog.addDialog({
         content: <ActiveRuleComponent
            cancel={()=>GDialog.removeDialog(this._ruleDialog)}
         />,
         callback: (id) => {
            this._ruleDialog = id;
         }
      })
   }

   /**
    * Get register dialog content title.
    */
   getRegisterTitle = (clueAuth, mobileAuth, awaitFun, shareCB) => {
      if(clueAuth == 2 && mobileAuth == 2) {
         return awaitFun ? (
            shareCB ? `签到完成！成功领取800朵玫瑰！<br/>继续注册再领取999朵玫瑰` : `手机注册领取999朵玫瑰`
         ) : (
            shareCB ? `签到完成！成功领取800朵玫瑰！<br/>继续注册再领取999朵玫瑰` : `已领取9999朵玫瑰<br/>继续注册再获得999朵玫瑰`
         );
      }
      else if(clueAuth == 2 && mobileAuth == 0) {
         return awaitFun ? (
            shareCB ? `签到完成！成功领取800朵玫瑰！<br/>快来领取新车优惠` : `江铃提醒您领取新车优惠券`
         ) : (
            shareCB ? `签到完成！成功领取800朵玫瑰！<br/>快来领取新车优惠` : `江铃提醒您领取新车优惠券`
         )
      }
      else {
         return awaitFun ? (
            shareCB ? `签到完成！成功领取800朵玫瑰！<br/>继续注册再领取999朵玫瑰` : `手机注册领取999朵玫瑰`
         ) : (
            shareCB ? `签到完成！成功领取800朵玫瑰！<br/>快来领取新车优惠` : `已领取9999朵玫瑰<br/>继续注册再获得999朵玫瑰`
         );
      }
   }

   /**
    * Show register dialog.
    */
   showRegisterDialog = (cancelReload = false, awaitFun = false, shareCB = false) => {
      const {clueAuth, mobileAuth} = this.state.userInfo;
      const contentTitle = this.getRegisterTitle(clueAuth, mobileAuth, awaitFun, shareCB);

      if(clueAuth == 2 || mobileAuth == 2) {
         const props = Object.assign({},{clueAuth, mobileAuth})
         GDialog.addDialog({
            content: <RegisterComponent
               contentTitle={contentTitle}
               openId={this.state.openid}
               officialId={this.officialId}
               fromOpenId={this.fromOpenId}
               getRoseType="11"
               {...props}
               cancel={(options = null, reload = false)=>{
                  GDialog.removeDialog(this._registerDialog);

                  if(options) {
                     this.showModal(options, reload);
                     return false;
                  }
                  else {
                     if(reload) {
                        this.dataInit();
                        return false;
                     }
                  }

                  if(cancelReload) {
                     this.dataInit();
                  }

               }}
            />,
            callback: (id) => {
               this._registerDialog = id;
               localStorage.setItem("smsVisibled",true);
            },
            cancel: (options = null) => {
               localStorage.removeItem("smsVisibled");

               if(cancelReload) {
                  this.dataInit();
               }
            }
         })
      }
      else {
         this.showModal({
            reload: false,
            title: "您已领取优惠券!",
            coupon: "新车购车优惠券",
            brand: this.state.userInfo.clue.brand,
            official_name: this.state.userInfo.clue.official_name
         })
      }

   }

   showModal = (options, reload) => {
      this.setState({
         pageReload: reload,
         modalVisible: true,
         orderInfo: options
      })
   }

   hideModal = () => {
      this.setState({
         modalVisible: false
      });

      if(this.state.pageReload) {
         this.dataInit();
      }
   }

   /**
    * Hide register dialog.
    */
   hideRegisterDialg = () => {
      GDialog.removeDialog(this._registerDialog);
   }

   /**
    * Show share dialog.
    */
   showShareDialog = () => {
      // ShareDialogContentComponent.showDialog();
      GDialog.addDialog({
         content: <ShareDialogContentComponent cancel={()=>GDialog.removeDialog(this._shareDialog)}/>,
         showClose: false,
         callback: (id) => {
            this._shareDialog = id;
         }
      })
   }

   /**
    * Route to /rank.
    */
   routeToRank = () => {
      this.props.history.push({
         pathname: '/rank'
      })
   }

}

const FRIEND_PRESENT_LIST_COMPONENT_TITLE = {
   imgUrl: "static/system/my_prevince_list_title.png",
   width: 249,
   height: 36
}

function mapStateToProps(state) {
   return {
      num: state.test
   }
}
// export default withRouter(App)
export default connect(mapStateToProps,test)(withRouter(App))
