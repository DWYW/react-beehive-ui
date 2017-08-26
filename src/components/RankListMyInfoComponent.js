import UIUtil from 'common/utils/UIUtil';
import {Flex} from 'antd-mobile';
import React from 'react';
import PropTypes from 'prop-types';

class RankListMyInfoComponent extends React.Component {
   constructor(props) {
      super(props);
   }

   render() {
      const {type, headimgurl, name, rank} = this.props;
      return (
         <div className="rank-list-my-info-component">
            <Flex className="rank-list-my-info-body" justify="center">
               <Flex.Item className="myinfo-photo-container">
                  {headimgurl && <img src={`${headimgurl}?x-oss-process=image/resize,w_64`}/>}
               </Flex.Item>

               <Flex.Item className="myinfo-container">
                  <div className="myinfo-name">{name}</div>
                  <div className="myinfo-rose">{this.getRosesText(type)}</div>
               </Flex.Item>

               <Flex.Item className={UIUtil.combineClassnames("myinfo-rank-container", {
                  "text-right": !type,
                  "text-center": type
               })}>
                  {!type ? (
                     <span>第 <span className="rank-number">{rank}</span>名</span>
                  ) : (
                     <span className="rank-number">
                        {rank}
                     </span>
                  )}
               </Flex.Item>
            </Flex>
         </div>
      )
   }

   /**
    * Get roses text.
    */
   getRosesText = (type) => {
      return  !type ? `获得${this.props.point}朵` : `送出${this.props.point}朵`;
   }


}

RankListMyInfoComponent.propTypes = {
   photoUrl: PropTypes.string,
   name: PropTypes.string,
   roses: PropTypes.number,
   rank: PropTypes.number,
   type: PropTypes.number
}

export default RankListMyInfoComponent;