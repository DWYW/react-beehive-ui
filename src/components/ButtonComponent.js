import Example from 'common/Example';
import TextPane from 'common/TextPane';
import i18n from  'i18n/'
import {BHButton, FlexBox, FlexItem} from 'beehive';
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

class ButtonComponent extends React.Component {
   constructor(props) {
      super(props);
      this.code = ""
   }

   render() {
      return (
         <div className={'component'}>
            <TextPane title="Button">
               <p>button效果有俩种，一种是普通的点击效果，一种是带特殊效果的。</p>
            </TextPane>

            <TextPane title="button示例"></TextPane>
            <FlexBox>
               <FlexItem className={'col-xs-12 col-sm-6'}>
                  <Example title={"普通效果"}  description="普通效果button的代码示例。" code={codes[0]}>
                     <BHButton disabled={true}>disabled</BHButton>
                     <BHButton>default</BHButton>
                     <BHButton className="primary">primary</BHButton>
                     <BHButton className="warning">warning</BHButton>
                     <BHButton className="success">success</BHButton>
                     <BHButton className="error">error</BHButton>
                  </Example>
               </FlexItem>
               <FlexItem className={'col-xs-12 col-sm-6'}>
                  <Example title={"特殊效果"} code={codes[1]} description={'特殊效果button的代码示例。'}>
                     <BHButton animation={true} type={"submit"}>default</BHButton>
                     <BHButton className="primary" animation={true}>primary</BHButton>
                     <BHButton className="warning" animation={true}>warning</BHButton>
                     <BHButton className="success" animation={true}>success</BHButton>
                     <BHButton className="error" animation={true}>error</BHButton>
                  </Example>
               </FlexItem>
            </FlexBox>

            <TextPane title={"Button API"} />
            <div className="table-container">
               <table cellSpacing="0">
                  <thead>
                     <tr>
                        <th>{i18n.$t("attribute")}</th>
                        <th>{i18n.$t("description")}</th>
                        <th>{i18n.$t("type")}</th>
                        <th>{i18n.$t("default")}</th>
                     </tr>
                  </thead>
                  <tbody>
                     <tr>
                        <td>className</td>
                        <td>自定义的class。</td>
                        <td>string</td>
                        <td>undefined</td>
                     </tr>
                     <tr>
                        <td>animation</td>
                        <td>是否开启特殊的点击效果，可选值：true, false</td>
                        <td>boolean</td>
                        <td>false</td>
                     </tr>
                  </tbody>
               </table>
            </div>
            <TextPane>其他可用属性都会直接传递给{"<BHButton></BHButton>"}</TextPane>
         </div>
      )
   }
}

export default ButtonComponent