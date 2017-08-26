import {Button} from "antd-mobile";
import React from 'react';
import PropTypes from 'prop-types';

class ActiveRuleComponent extends React.Component {
   constructor(props) {
      super(props);

      this.state = {
         animation: true
      }
   }

   render() {
      return (
         <div className="active-rule-component">
            <div className="rule-content">
               <p className="rule-title text-center">活动规则</p>
               <p className="rule-date text-center">活动时间：8.24-8.27</p>
               <div className="rule-body" onTouchMove={this.hidePointer}>
                  <p className="rule-body-title">玫瑰花的用途</p>
                  <p>1、玫瑰花“人气榜”数量排名奖励</p>
                  <p className="indent2">特等奖 3名，奖品:iphone7玫瑰金，乘坐玫瑰花车，送玫瑰花</p>
                  <p className="indent2">一等奖  5名，奖品:云南自驾游套餐</p>
                  <p className="indent2">二等奖10名，奖品:智能后视镜</p>
                  <p className="indent2">三等奖20名，奖品:500元加油卡</p>
                  <p>（注）2017.8.27活动结束后公布获奖人名单。请中奖者于2017.8.28保持手机畅通，我们的客服第一时间和您联系后续奖品发放事项</p>
                  <p>2、集满4999朵玫瑰，凭手机号码到活动地区经销商兑换精美礼品</p>
                  <p>3、每集满10000朵玫瑰，可到活动地区经销商享受江铃任意品牌100元购车优惠，每车最高优惠500元。（活动结束后三个月内有效）</p>
                  <p>（注）活动地区：北京、上海、四川、重庆、江西江铃经销商</p>
                  <p className="rule-body-title mgt03">如何获取玫瑰</p>
                  <p>1、进店扫码可获取9999朵玫瑰</p>
                  <p>2、活动主页手机注册可获取999朵玫瑰</p>
                  <p>3、每邀请一名好友注册可获取599朵玫瑰</p>
                  <p>4、转发活动，每被一人浏览可获取9朵玫瑰</p>
                  <p>5、每日转发签到成功可获取800朵玫瑰</p>
                  <p>6、邀请好友赠送玫瑰，帮助提升排名</p>
                  <p style={{fontSize: "0.26rem", paddingTop: "0.2rem"}}>本活动最终解释权归江铃汽车销售有限公司所有。咨询电话：15210359357</p>
                  {this.state.animation &&
                     <i className="iconfont icon-diy-com-scrollablepicker"></i>
                  }
               </div>

               <div className="text-center" style={{paddingTop: '0.2rem'}}>
                  <Button className="colse-btn" onClick={()=>{this.props.cancel()}}>我知道了</Button>
               </div>

            </div>

            <div className="dialog-bottom-bg-contianer">
               <img src="static/dialog/dialog_bottom_bg.png" />
            </div>
         </div>
      )
   }

   hidePointer = () => {
      this.setState({
         animation: false
      })
   }
}

ActiveRuleComponent.propTypes = {
   cancel: PropTypes.func
}

export default ActiveRuleComponent;