import ApiUtil from 'common/utils/ApiUtil';
import {API, tokenName, alphaTokenName, shareTime, service} from './service/Api';
import ActiveRuleComponent from './components/ActiveRuleComponent';
import {GDialog} from 'mobileUI/index/';
import UIUtil from 'common/utils/UIUtil';
import {Toast, Button, Flex, TextareaItem} from "antd-mobile";
import RegisterComponent from './components/RegisterComponent';
import FixedHeadComponent from './components/FixedHeadComponent';
import FriendInfoComponent from './components/FriendInfoComponent';
import React from 'react';
import moment from 'moment';
import {withRouter} from 'react-router'

import './styles/PresentGiftComponent.less';

class PresentGiftComponent extends React.Component {
   constructor(props) {
      super(props);

      this.state = {
         cashBtns: CASH_BTNS,
         wxUserInfo: null,
         ownerInfo: null,
         userInfo: null,
         openid: null,
         roseNumber: null,
         orderId: null,
         remark: ""

      }
   }

   componentWillMount() {
      this.officialId = ApiUtil.getQueryValue("official_id");
      this.alphaOfficialId = 31;
      this.routerOpenId = ApiUtil.getQueryValue("router_openid", this.props.location.search);
      this.tokenName = `${tokenName}${this.officialId}`;
      this.alphaTokenName = `${alphaTokenName}${this.alphaOfficialId}`;
      this.fromOpenId = ApiUtil.getQueryValue("from_openid");

      let baseUrl = `${location.origin}${location.pathname}${location.search}`;
      baseUrl += `&redirect_router_path=${this.props.location.pathname}`;
      baseUrl += `&router_openid=${this.routerOpenId}`;

      if(!localStorage.getItem("openid")) {
         window.location.href = `${location.origin}${location.pathname}?official_id=${this.officialId}#/`
         return false;
      }

      ApiUtil.setToken(API, this.alphaTokenName, this.alphaOfficialId, encodeURIComponent(baseUrl), "snsapi_base");

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

      if(ApiUtil.getToken(this.alphaTokenName)) {
         if(ApiUtil.getQueryValue('redirect_router_path') || ApiUtil.getQueryValue('router_openid')) {
            let search = location.search.replace(`&redirect_router_path=${this.props.location.pathname}`, "");
            search = search.replace(`&router_openid=${ApiUtil.getQueryValue("router_openid")}`, "");
            window.location.search = search;
         }

         this.getUserInfo()
      }
   }

   componentDidMount() {
      this.randomSetRemark();
   }

   componentWillUnmount() {
      GDialog.removeAll();
   }

   /**
    * Create cash btn.
    */
   createCashBtn = (btn, key) => {
      return (
         <Flex.Item key={`cashBtn${key}`}
            className={UIUtil.combineClassnames("cash-btn-container text-center", {
               "selected": btn.selected
            })}
            onClick={()=>{
               this.selectRoseNumber(btn.cash);
            }}>

            <div className="cash-nuber"><span>{btn.cash}</span>朵</div>
            <div className="cash-label">{btn.label}</div>

         </Flex.Item>
      )
   }

   render() {
      const {userInfo, cashBtns, roseNumber} = this.state;
      return (
         <div className="present-gift-component">
            <FixedHeadComponent/>

            <div className="present-gift-component-container">
               <div className="pg-header-container">
                  <div className="friend-info-container text-center">
                     <span className="active-rule-btn" onClick={this.showRuleDialog}>
                        <span>活动规则</span> <i className="iconfont icon-info"></i>
                     </span>
                     <FriendInfoComponent
                        name={userInfo ? userInfo.name : null}
                        headImgUrl={userInfo? userInfo.headimgurl : null}
                     />

                     <Flex className="cash-btns-container" wrap="wrap" align="center" alignContent="center">
                        {cashBtns.map((btn, key) => this.createCashBtn(btn, key))}
                     </Flex>
                     <div className="textarea-container">
                        <TextareaItem
                           className="has-border"
                           autoHeight
                           placeholder="请输入......"
                           rows={3}
                           value={this.state.remark}
                           onChange={this.inputRemark}
                           onBlur={this.randomSetRemark}
                        />
                     </div>

                  </div>
               </div>
               <div className="content-container text-center">
                  <Button className="present-rose-btn" inline={true} onClick={this.payMoneyEvent}>
                     给TA送玫瑰 <span className="present-rose-money">{roseNumber ? `￥${this.formatMoney(roseNumber/100)}` : ``}</span>
                  </Button>
               </div>
            </div>

         </div>
      )
   }

   /**
    * getUserInfo
    */
   getUserInfo = async () => {
      const wxUserInfo = await service.getWxUserInfo(this.alphaTokenName);

      const ownerInfo = await service.getUserInfo({
         openid: localStorage.getItem("openid"),
         official_id: this.officialId
      });
      const userInfo = await service.getUserInfo({
         openid: this.routerOpenId || this.fromOpenId,
         official_id: this.officialId
      });

      this.setState({
         wxUserInfo: wxUserInfo.data,
         ownerInfo: ownerInfo.data,
         userInfo: userInfo.data,
         openid: localStorage.getItem("openid")
      }, () => {
         this.createShare();
      })
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

         if((!prevShareTime || ApiUtil.isToDay(prevShareTime))) {
            if(mobileAuth == 2 || clueAuth == 2) {
               const nowTime = moment().format('YYYYMMDD');
               localStorage.setItem(shareTime, nowTime);
               this.showRegisterDialog();
            }
            else {
               Toast.info("签到完成！成功领取800朵玫瑰", 2)
            }
         }

         window.location.reload();
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
    * Select rose number.
    */
   selectRoseNumber = (number) => {
      let {cashBtns} = this.state;

      cashBtns.map((btn) => {
         if(btn.cash ==  number) {
            btn.selected = true;
         }
         else {
            btn.selected = false;
         }
         return btn;
      })

      this.setState({
         cashBtns: cashBtns,
         roseNumber: number
      })
   }

   /**
    * Format money number.
    */
   formatMoney = (money) => {
      return money.toFixed(2);
   }

   /**
    * Pay money event.
    */
   payMoneyEvent = async () => {
      // this.showRegisterDialog();

      // return false;

      if(!this.state.roseNumber) {
         Toast.info("请选择玫瑰花数量", 1.5);
         return false;
      }

      const payMoney = await service.payMoney({
         official_id: this.officialId,
         openid: this.state.openid,
         alpha_openid: this.state.wxUserInfo.open_id,
         money: this.formatMoney(this.state.roseNumber/100)
      })

      if(payMoney.code === 0) {
         this.onBridgeReady(payMoney.data);
         this.setState({
            orderId: payMoney.data.order_id
         })
      }
      else {
         Toast.info("支付失败", 1.5);
      }
   }

   /**
    * Wx onBridgeReady.
    */
   onBridgeReady = (data) => {
      WeixinJSBridge.invoke(
         'getBrandWCPayRequest', {
            "appId": data.appId,
            "timeStamp": data.timeStamp,
            "nonceStr": data.nonceStr,
            "package": data.package,
            "signType": "MD5",
            "paySign": data.paySign
         },
         (res) => {
            if(res.err_msg == "get_brand_wcpay_request:ok" ) {
               this.buyRose();
               // alert(11)
            }     // 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回    ok，但并不保证它绝对可靠。
         }
      );
   }

   /**
    * Buy rose.
    */
   buyRose = async () => {
      const comfirmOrder = await service.getRoses({
         official_id: this.officialId,
         openid: this.state.openid,
         from_openid: this.routerOpenId,
         type: 14,
         order_id: this.state.orderId,
         remark: this.state.remark
      })

      if(comfirmOrder.code === 0) {
         this.props.history.push({
            pathname: '/myfriend',
            search: `router_openid=${this.routerOpenId}`
         })
      }
   }

   /**
    * Show register dialog.
    */
   showRegisterDialog = () => {
      const {clueAuth, mobileAuth} = this.state.ownerInfo;

      if(clueAuth == 2 || mobileAuth == 2) {
         const props = Object.assign({},{clueAuth, mobileAuth})
         GDialog.addDialog({
            content: <RegisterComponent
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
                        window.location.reload();
                     }
                  }
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
   }

   /**
    * input remark.
    */
   inputRemark = (value) => {
      this.setState({
         remark: value
      })
   }

   /**
    * Random set remark.
    */
   randomSetRemark = () => {
      if(this.state.remark !== "") {
         return false;
      }

      const initRemark = BLESS[parseInt(Math.random()*11)].value;

      this.setState({
         remark: initRemark
      })
   }
}

const CASH_BTNS = [{
   cash: 1,
   selected: false,
   label: "情有独钟"
}, {
   cash: 9,
   selected: false,
   label: "长相厮守"
}, {
   cash: 36,
   selected: false,
   label: "浪漫心情"
}, {
   cash: 77,
   selected: false,
   label: "相爱七夕"
}, {
   cash: 99,
   selected: false,
   label: "天长地久"
}, {
   cash: 365,
   selected: false,
   label: "天天想你"
}, {
   cash: 520,
   selected: false,
   label: "真的爱你"
}, {
   cash: 1314,
   selected: false,
   label: "一生一世"
}, {
   cash: 10000,
   selected: false,
   label: "万年不变"
}]

const BLESS = [{
   label: `赠你玫瑰，我自己闻着也香！`,
   value: `赠你玫瑰，我自己闻着也香！`,
}, {
   label: `我要霸占你玫瑰榜第一名！`,
   value: `我要霸占你玫瑰榜第一名！`
}, {
   label: `只要能遇到，就是最好的时光！`,
   value: `只要能遇到，就是最好的时光！`
}, {
   label: `为你助力，七夕快乐！`,
   value: `为你助力，七夕快乐！`
}, {
   label: `祝天下所有有情人红成眷属！`,
   value: `祝天下所有有情人红成眷属！`
}, {
   label: `让我们一起来撒玫瑰花！`,
   value: `让我们一起来撒玫瑰花！`
}, {
   label: `甜言蜜语万句，不及鲜花一束！`,
   value: `甜言蜜语万句，不及鲜花一束！`
}, {
   label: `这个情人节，要有点不一样！`,
   value: `这个情人节，要有点不一样！`
}, {
   label: `不一样(特别)的礼物，送给不一样(特别)的你！`,
   value: `不一样(特别)的礼物，送给不一样(特别)的你！`
}, {
   label: `我赠你的玫瑰可以绕地球两圈了！`,
   value: `我赠你的玫瑰可以绕地球两圈了！`
}, {
   label: `送着玩玩，不要当真！`,
   value: `送着玩玩，不要当真！`
}]

export default withRouter(PresentGiftComponent);