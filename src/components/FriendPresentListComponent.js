import {service} from '../service/Api';
import {Flex, Toast} from 'antd-mobile';
import UIUtil from 'common/utils/UIUtil';
import React from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';

class FriendPresentListComponent extends React.Component {
   constructor(props) {
      super(props);
      this.pageNumber = 10,

      this.state = {
         title: null,
         lists: null,
         openId: null,
         page: 1
      }
   }

   componentWillMount() {
      this.mountTitleImgSize(this.props.titleImg);
      this.getListsData(this.props.openId);
   }

   componentWillReceiveProps(nextProps) {
      if(nextProps.openId !=this.props.openId) {
         this.getListsData(nextProps.openId);
      }
   }

   createList = (list, key) => {
      return (
         <li className="friend-list-item" key={`FriendPresentItem${key}`}>
            <Flex>
               <Flex.Item className="item-phone">
                  {this.props.linkTo && list.openid != -1 && this.props.ownerOpenId !== this.props.openid ? (
                     <Link to={{
                        pathname: '/myfriend',
                        search: `router_openid=${list.openid}`
                     }}>
                        <img src={`${list.headimgurl}?x-oss-process=image/resize,w_64`} />
                     </Link>
                  ) : (
                     <img src={list.openid == -1 ? `static/system/jmc_logo.jpg` : `${list.headimgurl}?x-oss-process=image/resize,w_64`} />
                  )}
               </Flex.Item>

               <Flex.Item className="item-info">
                  <div className="item-info-name">{list.name}</div>
                  <div className="item-info-desc">{list.remark}</div>
               </Flex.Item>

               <Flex.Item className="item-roses-container text-right">
                  <span className="item-roses">{list.point}</span>朵
               </Flex.Item>
            </Flex>
         </li>
      )
   }

   render() {
      const {title, lists} = this.state;

      return (
         <div className="friend-present-list">
            <div className="friend-present-list-head text-center" ref="friendPresentList">
               {title &&
                  <img src={title.imgUrl}  style={title.style}/>
               }
            </div>
            <div className="friend-present-list-container">
               <ul className="friend-present-list-ul" >
                  { !lists &&
                     <div className="text-center" style={{padding: "0.5rem 0 1rem"}}>正在获取·····</div>
                  }

                  { lists && lists.length == 0 &&
                     <div className="text-center" >
                        <span style={{padding: "0.5rem 0 1rem", display: "inline-block"}} onClick={this.getMore}>暂无朋友赠送</span>
                     </div>
                  }

                  { lists && lists.length > 0 &&
                    lists.map((list, key) => this.createList(list, key))
                  }

                  { lists && lists.length > 0 &&
                     <li className="more-btn-container text-center">
                        <span onClick={this.getMore}>查看更多</span>
                     </li>
                  }

                  <li className="rose-down"></li>
               </ul>
            </div>

         </div>
      )
   }

   /**
    * data = {srcUrl: url, width: width + px, height: height + px}
    */
   mountTitleImgSize = (data) => {
      if(!data) {
         return false;
      }

      const title = Object.assign({}, data);
      title.width = data.width/100 + "rem";
      title.height = data.height/100 + "rem";
      title.style = {width: title.width, height: title.height};

      this.setState({
         title: title
      })
   }

   /**
    * Get list.
    */
   getListsData = async (openid, page = 1) => {
      if(openid) {
         if(page == "all") {
            Toast.info("加载中···", 20);

            if(this.refs.friendPresentList.getBoundingClientRect().top < 0) {
               document.querySelector("html").scrollTop = UIUtil.getOffset(this.refs.friendPresentList).top;
               document.querySelector("body").scrollTop = UIUtil.getOffset(this.refs.friendPresentList).top;
            }
         }

         const lists = await service.getPresentListForMe({
            openid: openid,
            page: page
         })

         if(lists.code == 0) {
            this.setState({
               lists: lists.data,
               page: lists.page
            })

            if(page == "all") {
               Toast.hide();
               Toast.info("已刷新", 1)
            }
         }
      }
   }

   /**
    * Get more list data.
    */
   getMore = () => {
      this.getListsData(this.props.openId, "all")
   }
}

FriendPresentListComponent.propTypes = {
   titleImg: PropTypes.object,
   linkTo: PropTypes.bool,
   openId: PropTypes.string,
   ownerOpenId: PropTypes.string
}

FriendPresentListComponent.defaultProps = {
   linkTo: false
}

export default FriendPresentListComponent;