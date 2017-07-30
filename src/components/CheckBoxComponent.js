import Example from 'common/Example';
import TextPane from 'common/TextPane';
import i18n from  'i18n/'
import {BHCheckBox, BHSwitch, FlexBox, FlexItem} from 'beehive';
import React from 'react';

class CheckBoxComponent extends React.Component {
   constructor(props) {
      super(props);
   }

   render() {
      return (
         <div className={'component'}>
            <TextPane title="checkbox">
               <p>BHCheckBox 多选框。</p>
            </TextPane>

            <TextPane title="checkbox 示例"></TextPane>
            <FlexBox>
               <FlexItem className={'col-xs-12 col-sm-6'}>
                  <Example title={"默认icon"}  description="checkbox 组件，用于勾选操作。" code={CheckBoxComponent.codes[0]}>
                     <BHCheckBox>default</BHCheckBox>
                     <BHCheckBox className='primary'>primary</BHCheckBox>
                     <BHCheckBox className='success'>success</BHCheckBox>
                     <BHCheckBox className='warning'>warning</BHCheckBox>
                     <BHCheckBox className='error'>error</BHCheckBox>
                     <BHCheckBox disabled={true}>disabled</BHCheckBox>
                  </Example>
               </FlexItem>
               <FlexItem className={'col-xs-12 col-sm-6'}>
                  <Example title={"特殊icon"} code={CheckBoxComponent.codes[1]} description={'特殊icon的chebox，目前只有heart。'}>
                     <BHCheckBox iconType="heart" >default</BHCheckBox>
                     <BHCheckBox iconType="heart" className='primary'>primary</BHCheckBox>
                     <BHCheckBox iconType="heart" className='success'>success</BHCheckBox>
                     <BHCheckBox iconType="heart" className='warning'>warning</BHCheckBox>
                     <BHCheckBox iconType="heart" className='error'>error</BHCheckBox>
                     <BHCheckBox iconType="heart" disabled={true}>disabled</BHCheckBox>
                  </Example>
               </FlexItem>
            </FlexBox>

            <TextPane title={"BHButton API"} />
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
                        <td>自定义的 class。</td>
                        <td>string</td>
                        <td>无</td>
                     </tr>
                     <tr>
                        <td>checked</td>
                        <td>checkbox 的 checked 属性，可选值：true, false</td>
                        <td>boolean</td>
                        <td>false</td>
                     </tr>
                     <tr>
                        <td>disabled</td>
                        <td>是否添加 disabled 属性，可选值：true, false</td>
                        <td>boolean</td>
                        <td>false</td>
                     </tr>
                     <tr>
                        <td>iconType</td>
                        <td>icon 的类型，可选值：default, heart</td>
                        <td>string</td>
                        <td>default</td>
                     </tr>
                     <tr>
                        <td>iconStyle</td>
                        <td>icon 的 style属性</td>
                        <td>object</td>
                        <td>无</td>
                     </tr>
                     <tr>
                        <td>style</td>
                        <td>checkbox 的 style属性</td>
                        <td>object</td>
                        <td>无</td>
                     </tr>
                     <tr>
                        <td>onChange</td>
                        <td>checkbox 的 onChange event, return (true|false)</td>
                        <td>function</td>
                        <td>无</td>
                     </tr>
                  </tbody>
               </table>
            </div>

            <TextPane title="switch">
               <p>BHSwitch 开关组件。</p>
            </TextPane>

            <TextPane title="switch 示例"></TextPane>
            <FlexBox>
               <FlexItem className={'col-xs-12 col-sm-6'}>
                  <Example title={"说明"}  description="switch 开关组件，smaller 和 normal 两种" code={CheckBoxComponent.codes[0]}>
                     <BHSwitch>default</BHSwitch>
                     <BHSwitch open={true} className='primary'>primary</BHSwitch>
                     <BHSwitch type="smaller" open={true} className='success'>success</BHSwitch>
                     <BHSwitch type="smaller" open={true} className='warning'>warning</BHSwitch>
                     <BHSwitch open={true} className='error'>error</BHSwitch>
                     <BHSwitch disabled={true}>disabled</BHSwitch>
                  </Example>
               </FlexItem>
            </FlexBox>

            <TextPane title={"BHSwitch API"} />
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
                        <td>自定义的 class。</td>
                        <td>string</td>
                        <td>无</td>
                     </tr>
                     <tr>
                        <td>open</td>
                        <td>switch 是否打开，可选值：true, false</td>
                        <td>boolean</td>
                        <td>false</td>
                     </tr>
                     <tr>
                        <td>disabled</td>
                        <td>是否添加 disabled 属性，可选值：true, false</td>
                        <td>boolean</td>
                        <td>false</td>
                     </tr>
                     <tr>
                        <td>type</td>
                        <td>switch 的类型，可选值：smaller, normal</td>
                        <td>string</td>
                        <td>normal</td>
                     </tr>
                     <tr>
                        <td>onChange</td>
                        <td>checkbox 的 onChange event，return (true|false)</td>
                        <td>function</td>
                        <td>无</td>
                     </tr>
                  </tbody>
               </table>
            </div>

         </div>
      )
   }
}

CheckBoxComponent.codes = [`<BHCheckBox>default</BHCheckBox>
<BHCheckBox className='primary'>primary</BHCheckBox>
<BHCheckBox className='success'>success</BHCheckBox>
<BHCheckBox className='warning'>warning</BHCheckBox>
<BHCheckBox className='error'>error</BHCheckBox>
<BHCheckBox disabled={true}>disabled</BHCheckBox>
`, `<BHCheckBox iconType="heart">default</BHCheckBox>
<BHCheckBox iconType="heart" className='primary'>primary</BHCheckBox>
<BHCheckBox iconType="heart" className='success'>success</BHCheckBox>
<BHCheckBox iconType="heart" className='warning'>warning</BHCheckBox>
<BHCheckBox iconType="heart" className='error'>error</BHCheckBox>
<BHCheckBox iconType="heart" disabled={true}>disabled</BHCheckBox>
`, `<BHSwitch>default</BHSwitch>
<BHSwitch open={true} className='primary'>primary</BHSwitch>
<BHSwitch type="smaller" open={true} className='success'>success</BHSwitch>
<BHSwitch type="smaller" open={true} className='warning'>warning</BHSwitch>
<BHSwitch open={true} className='error'>error</BHSwitch>
<BHSwitch disabled={true}>disabled</BHSwitch>
`

]

export default CheckBoxComponent
