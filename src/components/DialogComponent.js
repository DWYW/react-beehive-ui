import Example from 'common/Example';
import TextPane from 'common/TextPane';
import utils from 'common/utils/';
import {NumberInput, BHButton, FlexBox, FlexItem, Notification, Dialog} from 'beehive';
import React from 'react';

let codes = [`const opts = {};
opts.content = "这是一段 alert 信息！";
opts.confirm = null;
Dialog.addDialog(opts);
`, `const opts = {};
opts.content = "这是一段 dialog 信息！";
Dialog.addDialog(opts);
`, `const opts = {};
opts.content = "这是一个自定义大小的 dialog！";
opts.width = 280;
opts.height = 120;
Dialog.addDialog(opts);
`, `const opts = {};
opts.content = "这是一个异步关闭的dialog！";
opts.confirm = (id) => {
   setTimeout(()=>{
      Dialog.removeDialog(id)
   },2000)
};
opts.cancel = (id) => {}
Dialog.addDialog(opts);
`, `const opts = {};
opts.content = () => {
const numberValue = this.state.numberValue;
   return (
      <div className="col-xs-12">
         <NumberInput value={numberValue} onChange={(num)=>{
            this.setState({
               numberValue: num
            })
         }}/>
      </div>
   )
};

opts.confirm = (id) => {
   alert(this.state.numberValue);
   Dialog.removeDialog(id)
   this.setState({
      numberValue: 0
   })
};
opts.cancel = (id) => {
   this.setState({
      numberValue: 0
   })
}
Dialog.addDialog(opts);
`

]

class DialogComponent extends React.Component {
   constructor(props) {
      super(props);

      this.state = {
         numberValue: 0
         // isShowClose: false,
         // method: "default",
         // duration: 5,
         // content: "请填写弹窗内容"
      }
   }

   componentWillUnmount() {
      Dialog.removeAll();
   }

   render() {
      return (
         <div className={'component'}>
            <TextPane title="Dialog">
               <p>作为弹出窗口。</p>
            </TextPane>

            <TextPane title="Dialog 示例"></TextPane>
            <FlexBox>
               <FlexItem className={'col-xs-6'}>
                  <Example title={"alert dialog"}  description="alert dialog的代码示例。" code={codes[0]}>
                     <BHButton onClick={()=> this.handleDialog(0)}>弹出alert</BHButton>
                  </Example>
                  <Example title={"设置大小"}  description="设置 dialog 的大小代码示例。" code={codes[2]}>
                     <BHButton onClick={()=> this.handleDialog(2)}>自定义大小示例</BHButton>
                  </Example>
                  <Example title={"异步关闭"}  description="异步关闭的代码示例。" code={codes[3]}>
                     <BHButton onClick={()=> this.handleDialog(3)}>2s后关闭</BHButton>
                  </Example>
               </FlexItem>
               <FlexItem className={'col-xs-6'}>
                  <Example title={"默认"}  description="默认 dialog 的代码示例。" code={codes[1]}>
                     <BHButton onClick={()=> this.handleDialog(1)}>默认dialog</BHButton>
                  </Example>
                  <Example title={"含有子组件"}  description="含有子组件 dialog 的代码示例。" code={codes[4]}>
                     <BHButton onClick={()=> {this.handleDialog(4)}}>含有子组件dialog</BHButton>
                  </Example>
               </FlexItem>
            </FlexBox>

            <TextPane title={"Dialog API"}>
               <p>{"添加调用方式：Dialog.addDialog(options)"}</p>
               <p>{"移除调用方式：Dialog.removeDialog(id)"}</p>
               <p>{"移除所有：Dialog.removeAll()"}</p>
               <p style={{fontWeight: 'bold', marginTop: '10px'}}>{"options API:"}</p>
            </TextPane>
            {utils.UIUtil.createTable(DialogComponent.table, 'dialogApi')}

         </div>
      )
   }

   /*
    * handleDialog.
    */
   handleDialog = (flag) => {
      const opts = {};
      switch(flag) {
      case 0:
         opts.content = "这是一个 alert dialog！";
         opts.confirm = null;
         break;
      case 1:
         opts.content = "这是一个默认 dialog！";
         break;
      case 2:
         opts.content = "这是一个自定义大小的 dialog！";
         opts.width = 280;
         opts.height = 120;
         break;
      case 3:
         opts.content = "这是一个异步关闭的dialog！";
         opts.confirm = (id) => {
            setTimeout(()=>{
               Dialog.removeDialog(id)
            },2000)
         };
         opts.cancel = () => {
            // console.log(id);
         }
         break;
      case 4:
         opts.content = () => {
            const numberValue = this.state.numberValue;
            return (
               <div className="col-xs-12">
                  <NumberInput  value={numberValue} style={{width: '100%', margin: '2px 0'}} onChange={(num)=>{
                     this.setState({
                        numberValue: num
                     })
                  }}/>
               </div>
            )
         };

         opts.confirm = (id) => {
            alert(this.state.numberValue)
            Dialog.removeDialog(id)
            this.setState({
               numberValue: 0
            })
         };
         opts.cancel = () => {
            // console.log(id)
            this.setState({
               numberValue: 0
            })
         }
         break;
      default:
         opts.content = "这是一段 alert 信息！";
         opts.confirm = null;
      }

      Dialog.addDialog(opts);
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
    * Sets notification attribute.
    */
   showDialog = () => {
      const opts = {};
      opts.title = 'title';
      opts.content = () => {
         return (
            <div>
               <p>content</p>
               <p>content</p>
            </div>
         )
      };

      opts.confirm = (id) => {
         setTimeout(()=>{
            console.log(id)
            Dialog.removeDialog(id)
         },2000)
      }

      Dialog.addDialog(opts)
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

DialogComponent.table = [
   [
      "options.title",
      "dialog 的 title 属性。",
      "string || component",
      "提示信息"
   ], [
      "options.content",
      "dialog 的 主题内容",
      "string || component",
      "无"
   ], [
      "options.width",
      "dialog 的宽度",
      "number",
      "320"
   ], [
      "options.height",
      "dialog 的高度",
      "number",
      "160"
   ], [
      "options.cancel",
      "取消事件回调。",
      "function",
      "无"
   ], [
      "options.confirm",
      "确定事件回调。",
      "function",
      "无"
   ]
]

export default DialogComponent