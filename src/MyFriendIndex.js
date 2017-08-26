import {API, isFirstEntry, shareTime, clearTime, tokenName, service} from './service/Api';
import ActiveRuleComponent from './components/ActiveRuleComponent';
import FixedHeadComponent from './components/FixedHeadComponent';
import FriendInfoComponent from './components/FriendInfoComponent';
import FooterComponent from './components/FooterComponent';
import RegisterComponent from './components/RegisterComponent';
import FriendPresentListComponent from './components/FriendPresentListComponent';
import {Button, Modal, Toast} from 'antd-mobile';
import ApiUtil from 'common/utils/ApiUtil';
import UIUtil from 'common/utils/UIUtil';
import React from "react";
import moment from 'moment';
import {withRouter} from 'react-router'
import {GDialog} from 'mobileUI/index/';

import './styles/MyFriendIndex.less';

class MyFriendIndex extends React.Component {
   constructor(props) {
      super(props);

      this.state = {
         listTitle: FRIEND_PRESENT_LIST_COMPONENT_TITLE,
         wxUserInfo: null,
         userInfo: null,
         ownerInfo: null,
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

      this.officialId = ApiUtil.getQueryValue("official_id");
      this.routerOpenId = ApiUtil.getQueryValue("router_openid", this.props.location.search);
      this.fromOpenId = ApiUtil.getQueryValue("from_openid");
      this.tokenName = `${tokenName}${this.officialId}`;
      let baseUrl = `${location.origin}${location.pathname}${location.search}`;
      baseUrl += `&redirect_router_path=${this.props.location.pathname}`

      ApiUtil.setToken(API, this.tokenName, this.officialId, encodeURIComponent(baseUrl));

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
         if(ApiUtil.getQueryValue('redirect_router_path') || ApiUtil.getQueryValue('router_openid')) {
            let search = location.search.replace(`&redirect_router_path=${this.props.location.pathname}`, "");
            search = search.replace(`&router_openid=${ApiUtil.getQueryValue("router_openid")}`, "");
            window.location.search = search;
         }

         this.getUserInfo();
      }
   }

   componentDidMount() {
      UIUtil.pageScrollTopTo(0);
   }

   componentWillUnmount() {
      GDialog.removeAll();
   }

   render() {
      const {userInfo, wxUserInfo, ownerInfo} = this.state;

      return (
         <div className="friend-index">
            <FixedHeadComponent/>
            <div className="friend-index-container">
               <div className="fi-header-container">
                  <div className="friend-info-container text-center">
                     <FriendInfoComponent
                        name={userInfo ? userInfo.name : null}
                        headImgUrl={userInfo? userInfo.headimgurl : null}
                     />

                     <div className="person-info text-center">
                        已收到
                        <span className="rose-number">{userInfo ? userInfo.point : 0}</span>
                        朵玫瑰，排名
                        <span className="rank-number">{userInfo ? userInfo.rank : 0}</span>
                        <span className="view-rank-btn" onClick={this.routeToRank}>查看排行榜</span>
                     </div>

                     <Button className="present-rose-btn" inline={true} onClick={this.linkToPresentGift}>给TA送玫瑰</Button>
                     <span className="active-rule-btn" onClick={()=>{this.addDialog('rule')}}>
                        <span>活动规则</span> <i className="iconfont icon-info"></i>
                     </span>
                  </div>
               </div>
               <div className="content-container">
                  <div className="content-slogan text-center" onClick={()=>{this.addDialog('register')}}>注册送TA 599朵玫瑰，我得999朵玫瑰</div>
                  <div className="share-btn-container text-center">
                     集玫瑰有好礼，<span className="share-btn" onClick={this.linkToIndex}>我也要玫瑰！</span>
                  </div>
                  <div className="text-center"><a className="jmc-skip" href="http://www.jmc.com.cn/">车辆和促销详情请点击</a></div>
                  <FriendPresentListComponent linkTo={false}  ownerOpenId={wxUserInfo ? wxUserInfo.open_id : ""} openId={this.routerOpenId || this.fromOpenId} titleImg={this.state.listTitle} />

                  <FooterComponent/>

               </div>

               <Modal
                  title={this.state.orderInfo && this.state.orderInfo.title}
                  transparent
                  maskClosable={false}
                  visible={this.state.modalVisible}
                  footer={[{text: '确定', onPress: () => { this.hideModal()}}]}
                  platform="ios"
               >
                  {this.state.orderInfo &&
                     `您已成功领取${this.state.orderInfo.brand}${this.state.orderInfo.coupon}，
                     请凭手机号码到${this.state.orderInfo.official_name}可以享受每1万朵玫瑰花，直降100元的优惠，每台车最多500元。`}
               </Modal>
            </div>
         </div>
      )
   }

   /**
    * getUserInfo
    */
   getUserInfo = async (update = true) => {
      const wxUserInfo = await service.getWxUserInfo(this.tokenName);
      const ownerInfo = await service.getUserInfo({
         openid: wxUserInfo.data.open_id,
         official_id: this.officialId
      });

      if(!localStorage.getItem("openid")) {
         localStorage.setItem("openid", wxUserInfo.data.open_id);
      }

      let baseUrl = `${location.origin}${location.pathname}${location.search}`;

      if(localStorage.getItem("openid") == this.routerOpenId) {
         baseUrl = baseUrl.replace(`&redirect_router_path=${ApiUtil.getQueryValue("redirect_router_path")}`, "");
         baseUrl = baseUrl.replace(`&router_openid=${ApiUtil.getQueryValue("router_openid")}`, "");
         window.location.href = baseUrl;
         return false;
      }

      if(localStorage.getItem("openid") == this.fromOpenId && !this.routerOpenId) {
         baseUrl = baseUrl.replace(`&redirect_router_path=${ApiUtil.getQueryValue("redirect_router_path")}`, "");
         baseUrl = baseUrl.replace(`&router_openid=${ApiUtil.getQueryValue("router_openid")}`, "");
         window.location.href = baseUrl;
         return false;
      }

      const userInfo = await service.getUserInfo({
         openid: this.routerOpenId || this.fromOpenId,
         official_id: this.officialId
      });

      this.setState({
         wxUserInfo: wxUserInfo.data,
         ownerInfo: ownerInfo.data,
         userInfo: userInfo.data,
         openid: wxUserInfo.data.open_id
      }, () => {
         if(update) {
            this.createShare();
            this.viewFriendPage();
            this.dialogInit();
         }
      })
   }

   /**
    * Dialog init.
    */
   dialogInit = () => {
      if(!localStorage.getItem(isFirstEntry)) {
         localStorage.setItem(isFirstEntry, true);
         this.showRuleDialog();
      }
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
            link: `${location.origin}${location.pathname}?official_id=${this.officialId}&from_openid=${this.routerOpenId || this.fromOpenId || this.state.openid}#/myfriend`,
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
         const {clueAuth, mobileAuth} = this.state.ownerInfo;

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
    * Share success.
    */
   viewFriendPage = async () => {
      const getRoses = await service.getRoses({
         official_id: this.officialId,
         openid: this.state.openid,
         from_openid: this.routerOpenId || this.fromOpenId,
         type: 17
      })

      if(getRoses.code === 0) {
         this.getUserInfo(false);
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
         this.showRegisterDialog();
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
   getRegisterTitle = (clueAuth, mobileAuth, shareCB) => {
      if(clueAuth == 2 && mobileAuth == 2) {
         return shareCB ? `签到完成！成功领取800朵玫瑰！<br/>继续注册再领取999朵玫瑰` : `手机注册送 Ta 599朵玫瑰<br/>自己领取999朵玫瑰`
      }
      else if(clueAuth == 2 && mobileAuth == 0) {
         return shareCB ? `签到完成！成功领取800朵玫瑰！<br/>快来领取新车优惠` : `江铃提醒您领取新车优惠券`
      }
      else {
         return shareCB ? `签到完成！成功领取800朵玫瑰！<br/>继续注册再领取999朵玫瑰` : `手机注册领取999朵玫瑰`
      }
   }

   /**
    * Show register dialog.
    */
   showRegisterDialog = (shareCB = false) => {
      const {clueAuth, mobileAuth} = this.state.ownerInfo;
      const contentTitle = this.getRegisterTitle(clueAuth, mobileAuth, shareCB);

      if(clueAuth == 2 || mobileAuth == 2) {
         const props = Object.assign({},{clueAuth, mobileAuth})
         GDialog.addDialog({
            content: <RegisterComponent
               contentTitle={contentTitle}
               openId={this.state.openid}
               officialId={this.officialId}
               fromOpenId={this.routerOpenId || this.fromOpenId}
               getRoseType="13"
               {...props}
               cancel={(options = null, reload = false)=>{
                  GDialog.removeDialog(this._registerDialog);

                  if(options) {
                     this.showModal(options, reload);
                  }
                  else {
                     if(reload) {
                        this.getUserInfo();
                     }
                  }

                  this.getUserInfo();
               }}
            />,
            callback: (id) => {
               this._registerDialog = id;
               localStorage.setItem("smsVisibled",true);
            },
            cancel: (options = null) => {
               localStorage.removeItem("smsVisibled");
            }
         })
      }
      else {
         this.showModal({
            reload: false,
            title: "您已领取优惠券！",
            coupon: "新车购车优惠券",
            brand: this.state.ownerInfo.clue.brand,
            official_name: this.state.ownerInfo.clue.official_name
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
         this.getUserInfo();
      }
   }

   /**
    * Link to present git.
    */
   linkToPresentGift = () => {
      this.props.history.push({
         pathname: '/presentgift',
         search: `router_openid=${this.routerOpenId || this.fromOpenId}`
      })
   }

   /**
    * Link to index
    */
   linkToIndex = () => {
      this.props.history.push({
         pathname: '/'
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
   imgUrl: "static/system/my_frend_prevince_list_title.png",
   width: 258,
   height: 36
}

export default withRouter(MyFriendIndex)