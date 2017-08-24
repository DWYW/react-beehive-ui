import {service} from '../service/Api';
import SubscribeComponent from "./SubscribeComponent";
import {Flex, InputItem, Button, Toast} from "antd-mobile";
import UIUtil from 'common/utils/UIUtil';
import React from 'react';
import PropTypes from 'prop-types';

class RegisterComponent extends React.Component {
   constructor(props) {
      super(props);
      this._registerAble = true;
      // this._time = 60;
      this.state = {
         phoneNumber: "",
         times: "获取验证码",
         verification: "",
         modal: false,
         switchState: true,
         brand: null,
         shop: null,
      }
   }

   componentWillReceiveProps(nextProps) {
      console.log(nextProps)
   }

   render() {
      const {mobileAuth, clueAuth} = this.props;
      const {phoneNumber, times, verification, ...restState} = this.state;

      return (
         <div className="register-container">
            <div className="register-content">
               <p className="register-title" dangerouslySetInnerHTML={{__html: this.props.contentTitle}}></p>
               {mobileAuth ==2 &&
                  <div className="register-body">
                     <Flex>
                        <Flex.Item className="item-label">电话号码：</Flex.Item>
                        <Flex.Item>
                           <InputItem name="phoneNumber" value={phoneNumber}  onChange={this.inputPhoneNumber} className="hasBorder"/>
                        </Flex.Item>
                     </Flex>
                     <Flex className="mgt02">
                        <Flex.Item className="item-label">验证码：</Flex.Item>
                        <Flex.Item className="verification">
                           <InputItem name="yzm" className="hasBorder" value={verification} onChange={this.inputVerification}/>
                        </Flex.Item>
                        <Flex.Item className="get-verification">
                           <Button className="get-verification-btn" onClick={this.getVerification}>{times}</Button>
                        </Flex.Item>
                     </Flex>
                  </div>
               }

               {clueAuth ==2 &&
                  <SubscribeComponent mobileAuth={mobileAuth} clueAuth={clueAuth} {...restState} callback={this.subScribeCB}/>
               }

               <div className="text-center">
                  {mobileAuth == 0 &&
                     <Button className="mgt07 cancel-btn" onClick={this.hideDialog}>委婉拒绝</Button>
                  }

                  <Button className={UIUtil.combineClassnames("mgt07 confirm-btn", {"sigle-btn": mobileAuth !== 0})} onClick={this.formConfirm}>完成注册</Button>
               </div>
            </div>
            <div className="dialog-bottom-bg-contianer">
               <img src="static/dialog/dialog_bottom_bg.png" />
            </div>
         </div>
      )
   }

   /**
    * Input phone number.
    */
   inputPhoneNumber = (value) => {
      if(value.match(/^\d*$/g)) {
         this.setState({
            phoneNumber: value
         })
      }
   }

   /**
    * Input verification.
    */
   inputVerification = (value) => {
      this.setState({
         verification: value
      })
   }

   /**
    * get verification.
    */
   getVerification = async () => {
      const {phoneNumber} = this.state;
      if(!phoneNumber.match(/^1[0-9]{10}$/)) {
         Toast.info('手机号码不正确！', 1.5);
      }
      else {
         if(this.state.times == "获取验证码") {
            const sendSms = await service.sendSms({mobile: phoneNumber});
            this.smsSetInterval(60);
         }
      }
      // const sendSms = await service.sendSms({mobile: phoneNumber});
   }

   /**
    * send sms 60s setInterval.
    */
   smsSetInterval = (time) => {
      if(localStorage.getItem("smsVisibled")) {
         this.setState({
            times: `${time}s`
         })

         setTimeout(() => {
            if(time >0 ) {
               this.smsSetInterval(time - 1);
            }
            else {
               this.setState({
                  times: `获取验证码`
               })
            }
         },1000)
      }
   }

   /**
    * SubscribeComponent callback.
    */
   subScribeCB = (obj) => {
      const {switchState, brand, shop} = obj;
      this.setState({
         switchState,
         brand,
         shop
      })
   }

   /**
    * form confirm .
    */
   formConfirm = async () => {
      const {phoneNumber, verification, switchState, brand, shop} = this.state;
      const {mobileAuth} = this.props;

      if(!phoneNumber && mobileAuth == 2) {
         Toast.info("请输入手机号", 1.5);
         return false;
      }

      if(!verification && mobileAuth == 2) {
         Toast.info("请输入验证码", 1.5);
         return false;
      }

      if(switchState) {
         if(!brand) {
            Toast.info("请选择品牌", 1.5);
            return false;
         }

         if(!shop) {
            Toast.info("请选择经销店", 1.5);
            return false;
         }
      }
      //once
      if(this._registerAble == false) {
         return false;
      }

      this._registerAble = false;

      if(mobileAuth == 2) {
         const checkPhoneNumber = await service.checkPhoneNumber({
            openid: this.props.openId,
            mobile: phoneNumber,
            smscode: verification
         })

         if(checkPhoneNumber.code == -1) {
            Toast.info(checkPhoneNumber.message, 1.5);
            this._registerAble = true;
            return false;
         }

         await service.getRoses({
            official_id: this.props.officialId,
            openid: this.props.openId,
            from_openid: this.props.fromOpenId,
            type: this.props.getRoseType,
         })

      }

      if(switchState || !mobileAuth) {
         const comfirmOrder = await service.comfirmOrder({
            official_id: this.props.officialId,
            openid: this.props.openId,
            type: 1,
            dealer: shop.id,
            brand: brand.id
         })

         if(comfirmOrder.code == 0) {
            this.props.cancel({
               title: "优惠券领取成功！",
               coupon: "新车购车优惠券",
               brand: comfirmOrder.data.brand,
               official_name: comfirmOrder.data.official_name
            }, true)

            this._registerAble = true;
            return false;
         }
         else {
            Toast.info(comfirmOrder.message, 1.5);
         }
      }

      this._registerAble = null;

      this._registerAble = true;

      this.props.cancel(null, true);
   }

   /**
    * Hide dialog.
    */
   hideDialog = () => {
      if(this.props.cancel) {
         this.props.cancel()
      }
   }

}

RegisterComponent.propTypes = {
   clueAuth: PropTypes.any,
   mobileAuth: PropTypes.any,
   contentTitle: PropTypes.string
}

RegisterComponent.defaultProps = {
   contentTitle: '手机注册领取999朵玫瑰'
}

export default RegisterComponent;