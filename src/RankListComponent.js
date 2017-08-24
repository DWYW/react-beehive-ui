import {service, shareTime} from './service/Api';
import ApiUtil from 'common/utils/ApiUtil';
import FixedHeadComponent from './components/FixedHeadComponent';
import RankListMyInfoComponent from './components/RankListMyInfoComponent';
import UIUtil from 'common/utils/UIUtil';
import {Flex, Toast} from 'antd-mobile';
import {withRouter} from 'react-router'
import React from 'react';
import moment from 'moment';

import "./styles/RankListComponent.less";

class RankListComponent extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         tabSelected: 0,
         rqRank: null,
         hqRank: null,
         mePoint: null,
         meInfo: null
      }
   }

   componentDidMount() {
      this.openId = localStorage.getItem("openid");
      this.officialId = ApiUtil.getQueryValue("official_id");
      this.init();
   }

   createList = (datas, keyPrefix, isNumber = false) => {
      return (
         <ul className="rl-tab">
            {
               datas.map((list, key) => {
                  if(key > 50) {
                     return false
                  }
                  return (
                     <li className="rl-tab-item" key={`${keyPrefix}rankList${key}`}>
                        <Flex className="rl-tab-item-container">
                           <Flex.Item className="rltic-photo-container">
                              <img src={`${list.headimgurl}?x-oss-process=image/resize,w_64`}/>
                           </Flex.Item>

                           <Flex.Item className="rltic-rank-info-container">
                              <div className="rank-info-name">{list.name}</div>
                              <div className="rank-info-rose">
                                 {!isNumber ? `获得${list.point}朵` : `送出${list.point}朵`}
                              </div>
                           </Flex.Item>

                           <Flex.Item className={UIUtil.combineClassnames("rltic-rank-container", {
                              "text-right": !isNumber,
                              "text-center": isNumber
                           })}>
                              {!isNumber ? (
                                 <span>第 <span className="rank-number">{key+1}</span>名</span>
                              ) : (
                                 key < 3 ? (
                                    <img src={this.getRankIcon(key)}/>
                                 ) : (
                                    <span className="rank-number">{key+1}</span>
                                 )
                              )}

                           </Flex.Item>
                        </Flex>
                     </li>
                  )
               })
            }
         </ul>

      )
   }

   render() {
      const {tabSelected, rqRank, hqRank, meInfo} = this.state;
      return (
         <div className="rank-list-component">
            <FixedHeadComponent/>
            <div className="rank-list-component-container">
               <div className="rank-list-component-head">
                  <Flex className="rank-list-component-head-container">
                     <Flex.Item className={UIUtil.combineClassnames("head-item text-center", {"selected": tabSelected == 0})} onClick={()=>{this.switchRank(0)}}>
                        <img src={tabSelected ? "static/system/rq_title.png" : "static/system/rq_title_selected.png"} />
                     </Flex.Item>
                     <Flex.Item className={UIUtil.combineClassnames("head-item text-center", {"selected": tabSelected == 1})} onClick={()=>{this.switchRank(1)}}>
                        <img src={!tabSelected ? "static/system/hq_title.png" : "static/system/hq_title_selected.png"} />
                     </Flex.Item>
                  </Flex>
               </div>
               <div className="rank-list-component-content" style={{minHeight: 'calc(100vh - 2.32rem)'}}>
                  <div className={UIUtil.combineClassnames("rank-list-component-body", {"pdt02": !this.state.mePoint})}>
                     <div className="rank-list-component-body-content" style={this.mountTabTranform(tabSelected)}>
                        <div className="rank-list-rq-lists">
                           {!rqRank &&
                              <span className="data-loading">加载中···</span>
                           }
                           {rqRank && rqRank.length == 0 &&
                              <span className="data-loading">暂无数据</span>
                           }
                           {rqRank &&
                              this.createList(rqRank, "rq")
                           }
                        </div>
                        <div className="rank-list-hq-lists">
                           {!hqRank &&
                              <span className="data-loading">加载中···</span>
                           }
                           {hqRank && hqRank.length == 0 &&
                              <span className="data-loading">暂无数据</span>
                           }
                           {hqRank &&
                              this.createList(hqRank, "hq", true)
                           }
                        </div>
                     </div>
                  </div>
               </div>
            </div>

            {(this.state.mePoint !== null && this.state.mePoint !== undefined) &&
               <RankListMyInfoComponent type={tabSelected} {...meInfo} iconImg={this.getRankIcon(meInfo ? meInfo.rank - 1 : "")}/>
            }
         </div>
      )
   }

   /**
    * Page init.
    */
   init = () => {
      UIUtil.pageScrollTopTo(0);
      this.switchRank(0);
   }

   /**
    * Switch rank.
    */
   switchRank = (index) => {
      this.getRankList(index + 1);

      this.setState({
         tabSelected: index
      })
   }

   /**
    * Get rank list.
    */
   getRankList = async (type) => {
      const rankList = await service.getRankList({
         openid: this.openId,
         type: type
      });

      const filter = [];

      rankList.data.list.forEach((item) => {
         if(item.openid && item.openid != -1 && item.openid != "null") {
            filter.push(item);
         }
      })

      if(type == 1) {
         // console.log(rankList.data)
         this.setState({
            rqRank: filter,
            hqRank: null,
            meInfo: rankList.data.me,
            mePoint: rankList.data.me.point
         }, () => {
            this.createShare();
         })
      }
      else {
         this.setState({
            hqRank: rankList.data.list,
            rqRank: null,
            meInfo: rankList.data.me
         })
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
            title: `七夕活动收江铃玫瑰，今天是第 ${ApiUtil.mountDays()} 天，已收到 ${this.state.mePoint} 朵`,
            link: `${location.origin}${location.pathname}?official_id=${this.officialId}&from_openid=${this.openId}#/myfriend`,
            imgUrl: this.state.meInfo.headimgurl,
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
         const {clueAuth, mobileAuth} = this.state.meInfo;

         if((!prevShareTime || ApiUtil.isToDay(prevShareTime))) {
            if(mobileAuth == 2 || clueAuth == 2) {
               localStorage.setItem(shareTime, moment().format('YYYYMMDD'));
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
    * Tab switch animation.
    */
   mountTabTranform = (index) => {
      const style = {};
      style['transform'] = `translateX(-${100/2*index}%)`;
      return style;
   }

   /**
    * Get rank icon img url.
    */
   getRankIcon = (index) => {
      switch(index) {
      case 0:
         return `static/system/icon_first.png`;
         break;
      case 1:
         return `static/system/icon_second.png`;
         break;
      case 2:
         return `static/system/icon_third.png`;
         break;
      default:
         return null
      }
   }

}

export default withRouter(RankListComponent);