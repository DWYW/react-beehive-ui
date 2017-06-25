import {FlexBox, FlexItem, BHTree} from 'beehive';
import React from 'react';

export default class Navigation extends React.Component {
   constructor(props) {
      super(props);
      this.treeData = [{
         idx: 1000,
         label: 'label1',
         iconClassName: ["icon-wenjianjia", "icon-wenjianjia-open"],
         className: null,
         isOpen: true,
         isSelected: false,
         children: [{
            idx: 10001,
            label: 'label1-1',
            iconClassName: ["icon-wenjianjia", "icon-wenjianjia-open"],
            className: null,
            isOpen: false,
            isSelected: false,
            children: [{
               idx: 100011,
               label: 'label1-1-1',
               iconClassName: ["icon-wenjian", "icon-wenjian"],
               className: null,
               isOpen: false,
               isSelected: false,
               children: null
            },{
               idx: 100012,
               label: 'label1-1-2',
               iconClassName: ["icon-wenjian", "icon-wenjianjia"],
               className: null,
               isOpen: false,
               isSelected: false,
               children: null
            }]
         },{
            idx: 10002,
            label: 'label1-2',
            iconClassName: ["icon-wenjian", "icon-wenjian"],
            className: null,
            isOpen: false,
            isSelected: false,
            children: null
         },{
            idx: 10003,
            label: 'label1-3',
            iconClassName: ["icon-wenjian", "icon-wenjian"],
            className: null,
            isOpen: false,
            isSelected: false,
            children: null
         }]
      },{
         idx: 1001,
         label: 'label2',
         iconClassName: ["icon-wenjianjia", "icon-wenjianjia-open"],
         className: null,
         isOpen: false,
         isSelected: false,
         children: [{
            idx: 10011,
            label: 'label2-1',
            iconClassName: ["icon-wenjian", "icon-wenjian"],
            className: null,
            isOpen: false,
            isSelected: false,
            children: null
         },{
            idx: 10012,
            label: 'label2-2',
            iconID: 1,
            iconClassName: ["icon-wenjian", "icon-wenjian"],
            className: null,
            isOpen: false,
            isSelected: false,
            children: null
         }]
      },{
         idx: 1002,
         label: 'label3',
         iconClassName: ["icon-wenjianjia", "icon-wenjianjia-open"],
         className: null,
         isOpen: false,
         isSelected: false,
         children: [{
            idx: 10021,
            label: 'label3-1',
            iconClassName: ["icon-wenjian", "icon-wenjian"],
            className: null,
            isOpen: false,
            isSelected: false,
            children: null
         }]
      },{
         idx: 1003,
         label: 'label4',
         iconClassName: ["icon-wenjian", "icon-wenjian"],
         className: null,
         isOpen: false,
         isSelected: false,
         children: null
      }];
      this._clickCB = this._clickCB.bind(this);
      this.state = {
         treeSelect: null
      }
   }

   _clickCB(res) {
      console.log(res);
      // this.setState({
      //    treeSelect: res
      // })
   }

   render() {
      return (
         <FlexBox className="navigation" >
            {this.state.treeSelect}
            <FlexItem className="col-xs-12">
               <BHTree data={this.treeData} onClick={this._clickCB}></BHTree>
            </FlexItem>
            <i className="iconfont icon-wenjian"></i>
         </FlexBox>
      )
   }
}