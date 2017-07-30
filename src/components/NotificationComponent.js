import Example from 'common/Example';
import TextPane from 'common/TextPane';
import utils from 'common/utils/';
// import i18n from  'i18n/';
import {BHSelect, NumberInput, BHInput, BHButton, FlexBox, FlexItem, Notification} from 'beehive';
import React from 'react';

let codes = [`<BHButton disabled={true}>disabled</BHButton>
<BHButton>default</BHButton>
<BHButton className="primary">primary</BHButton>
<BHButton className="warning">warning</BHButton>
<BHButton className="success">success</BHButton>
<BHButton className="error">error</BHButton>
`,`<BHButton animation={true}>default</BHButton>
<BHButton className="primary" animation={true}>primary</BHButton>
<BHButton className="warning" animation={true}>warning</BHButton>
<BHButton className="success" animation={true}>success</BHButton>
<BHButton className="error" animation={true}>error</BHButton>`

]

class NotificationComponent extends React.Component {
   constructor(props) {
      super(props);

      this.state = {
         isShowIcon: false,
         isShowClose: false,
         method: "default",
         duration: 5,
         content: "请填写弹窗内容"
      }
   }

   render() {
      return (
         <div className={'component'}>
            <TextPane title="Notification">
               <p>作为提示的弹出窗口。</p>
            </TextPane>

            <TextPane title="Notification 示例"></TextPane>
            <FlexBox>
               <FlexItem className={'col-xs-12'}>
                  <Example title={"普通效果"}  description="普通效果button的代码示例。" code={codes[0]}>
                     <div className="col-xs-12">
                        Notification类型：
                        <BHSelect placeholder="请选择类型" style={{fontSize: '12px'}}
                           onChange={(method) => {this.setAttribute('method', method)}}>
                           <BHSelect.option value="default">default</BHSelect.option>
                           <BHSelect.option value="primary">primary</BHSelect.option>
                           <BHSelect.option value="success">success</BHSelect.option>
                           <BHSelect.option value="warn">warn</BHSelect.option>
                           <BHSelect.option value="error">error</BHSelect.option>
                        </BHSelect>
                     </div>
                     <div className="col-xs-12">
                        Notification内容：
                        <BHInput onChange={(e) => {this.setAttribute('content', e.target.value)}}></BHInput>
                     </div>
                     <div className="col-xs-12">
                        是否显示icon：
                        <BHSelect placeholder="是否显示icon" style={{fontSize: '12px'}}
                           onChange={(isShowIcon) => {this.setAttribute('isShowIcon', isShowIcon)}}>
                           <BHSelect.option value={false}>否</BHSelect.option>
                           <BHSelect.option value={true}>是</BHSelect.option>
                        </BHSelect>
                     </div>
                     <div className="col-xs-12">
                        是否显示关闭按钮：
                        <BHSelect placeholder="是否显示icon" style={{fontSize: '12px'}}
                           onChange={(isShowClose) => {this.setAttribute('isShowClose', isShowClose)}}>
                           <BHSelect.option value={false}>否</BHSelect.option>
                           <BHSelect.option value={true}>是</BHSelect.option>
                        </BHSelect>
                     </div>
                     <div className="col-xs-12">
                        自动关闭时间（s）：
                        <NumberInput min={0} onChange={(e) => {this.setAttribute('duration', e.target.value)}}></NumberInput>
                     </div>
                     <div className="col-xs-12">
                        <BHButton className={'primary'} animation={true} onClick={this.notificationHandle}>notification</BHButton>
                     </div>
                  </Example>
               </FlexItem>
            </FlexBox>

            <TextPane title={"Notification API"}>
               <p>{"调用方式：Notification[type](content, {options})"}</p>
            </TextPane>
            {utils.UIUtil.createTable(NotificationComponent.table, 'notificationApi')}

            <TextPane>
               <i className="iconfont icon-warn" style={{paddingRight: "3px", color: "#f9b657"}}></i>
               当showClose为false时，duration 设置为0时，duration 会自动强制设置为默认值5
            </TextPane>
         </div>
      )
   }

   /*
    * Sets notification attribute.
    */
   setAttribute = (attr, value) => {
      const st = {};
      st[attr] = value;
      this.setState(st);
   }

   /*
    * Handle notification.
    */
   notificationHandle = () => {
      const {method, content, isShowIcon, isShowClose, duration} = this.state;
      Notification[method](content,{
         showIcon: isShowIcon,
         showClose: isShowClose,
         duration: duration
      })
   }

}

NotificationComponent.table = [
   [
      "type",
      "通知弹窗的类型，可选类型：default, success, primary, error, danger",
      "string",
      "无"
   ], [
      "content",
      "通知的内容。",
      "string",
      "无"
   ], [
      "options.showIcon",
      "是否显示图标，可选值：true | false 。",
      "boolean",
      "false"
   ], [
      "options.showClose",
      "是否显示关闭按钮，可选值：true | false 。",
      "boolean",
      "false"
   ], [
      "options.duration",
      "duration 秒后自动关闭， 0表示手动关闭。",
      "number",
      "5"
   ]
]

export default NotificationComponent