import Example from 'common/Example';
import TextPane from 'common/TextPane';
import i18n from  'i18n/'
import {BHInput, NumberInput, FlexBox, FlexItem} from 'beehive';
import React from 'react';

let codes = [`<BHInput type={'text'}/>
<BHInput className="primary" type={'text'}/>
<BHInput className="warning" type={'text'}/>
<BHInput className="success" type={'text'}/>
<BHInput className="error" type={'text'}/>
<BHInput disabled={true} type={'text'}/>
<BHInput readOnly={true} defaultValue={"readOnly"} type={'text'}/>
`, `<NumberInput type={'text'}/>
<NumberInput className="primary" type={'text'}/>
<NumberInput className="warning" type={'text'}/>
<NumberInput className="success" type={'text'}/>
<NumberInput className="error" type={'text'}/>
<NumberInput disabled={true} type={'text'}/>
<NumberInput readOnly={true} defaultValue={"readOnly"} type={'text'}/>
`, `<BHInput className="primary" type={'text'} prevIcon="icon-shuru"/>
<BHInput className="warning" type={'text'} prevIcon="icon-warn"/>
<BHInput className="success" type={'text'} nextIcon="icon-success"/>
<BHInput className="error" type={'text'} nextIcon="icon-close"/>
`

]

class ButtonComponent extends React.Component {
   constructor(props) {
      super(props);
      this.code = ""
   }

   render() {
      return (
         <div className={'component'}>
            <TextPane title="Input">
               <p>信息输入组件。</p>
            </TextPane>

            <TextPane title="input示例"></TextPane>
            <FlexBox>
               <FlexItem className={'col-xs-12 col-sm-6'}>
                  <Example title={"普通input"}
                     description="有5种颜色可供选择,default, primary, warning, success, error"
                     code={codes[0]}>
                     <BHInput type={'text'}/>
                     <BHInput className="primary" type={'text'}/>
                     <BHInput className="warning" type={'text'}/>
                     <BHInput className="success" type={'text'}/>
                     <BHInput className="error" type={'text'}/>
                     <BHInput disabled={true} type={'text'}/>
                     <BHInput readOnly={true} defaultValue={"readOnly"} type={'text'}/>
                  </Example>
                  <Example title={"带有 icon"}
                     description="有5种颜色可供选择,default, primary, warning, success, error"
                     code={codes[2]}>
                     <BHInput className="primary" type={'text'} prevIcon="icon-shuru"/>
                     <BHInput className="warning" type={'text'} prevIcon="icon-warn"/>
                     <BHInput className="success" type={'text'} nextIcon="icon-success"/>
                     <BHInput className="error" type={'text'} nextIcon="icon-close"/>
                  </Example>
               </FlexItem>
               <FlexItem className={'col-xs-12 col-sm-6'}>
                  <Example title={"NumberInput"} code={codes[1]} description={'有5种颜色可供选择,default, primary, warning, success, error'}>
                     <NumberInput type={'text'}/>
                     <NumberInput className="primary" type={'text'}/>
                     <NumberInput className="warning" type={'text'}/>
                     <NumberInput className="success" type={'text'}/>
                     <NumberInput className="error" type={'text'}/>
                     <NumberInput disabled={true} type={'text'}/>
                     <NumberInput readOnly={true} defaultValue={"readOnly"} type={'text'}/>
                  </Example>
               </FlexItem>
            </FlexBox>

            <TextPane title={"input API"} />
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
                        <td>无</td>
                     </tr>
                     <tr>
                        <td>type</td>
                        <td>input的type属性，可选值：除number之外的其它可选值。</td>
                        <td>string</td>
                        <td>text</td>
                     </tr>
                     <tr>
                        <td>prevIcon</td>
                        <td>有效的icon className。</td>
                        <td>string</td>
                        <td>无</td>
                     </tr>
                     <tr>
                        <td>prevIconStyle</td>
                        <td>prevIcon 的样式集合</td>
                        <td>object</td>
                        <td>无</td>
                     </tr>
                     <tr>
                        <td>nextIcon</td>
                        <td>有效的icon className。</td>
                        <td>string</td>
                        <td>无</td>
                     </tr>
                     <tr>
                        <td>nextIconStyle</td>
                        <td>nextIcon 的样式集合</td>
                        <td>object</td>
                        <td>无</td>
                     </tr>
                     <tr>
                        <td>defaultValue</td>
                        <td>input的默认值。</td>
                        <td>string</td>
                        <td>无</td>
                     </tr>
                  </tbody>
               </table>
            </div>
            <TextPane>其他可用属性都会直接传递给{"<BHInput/>"}</TextPane>

            <TextPane title={"number input API"} />
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
                        <td>无</td>
                     </tr>
                     <tr>
                        <td>prevIcon</td>
                        <td>有效的icon className。</td>
                        <td>string</td>
                        <td>无</td>
                     </tr>
                     <tr>
                        <td>prevIconStyle</td>
                        <td>prevIcon 的样式集合</td>
                        <td>object</td>
                        <td>无</td>
                     </tr>
                     <tr>
                        <td>min</td>
                        <td>最小值</td>
                        <td>number</td>
                        <td>无</td>
                     </tr>
                     <tr>
                        <td>max</td>
                        <td>最大值</td>
                        <td>number</td>
                        <td>无</td>
                     </tr>
                     <tr>
                        <td>defaultValue</td>
                        <td>input的默认值。</td>
                        <td>string</td>
                        <td>无</td>
                     </tr>
                     <tr>
                        <td>onChange</td>
                        <td>onChange事件的handler。(return value)</td>
                        <td>function</td>
                        <td>无</td>
                     </tr>
                  </tbody>
               </table>
            </div>
            <TextPane>其他可用属性都会直接传递给{"<NumberInput/>"}</TextPane>
         </div>
      )
   }
}

export default ButtonComponent