import Example from 'common/Example';
import TextPane from 'common/TextPane';
import utils from 'common/utils/';
import {FlexBox, FlexItem, BHRadio, RadioGroup} from 'beehive';
import React from 'react';

let codes = [`<BHRadio value= "this is test radio" />
<BHRadio value= "this is test radio">test radio</BHRadio>
<BHRadio value="test" checked={true} > 默认选中 </BHRadio>
`,`<RadioGroup>
   <BHRadio value="0"> value = 0</BHRadio>
   <BHRadio value="1"> value = 1</BHRadio>
   <BHRadio value="2"> value = 2</BHRadio>
</RadioGroup>
`, `<RadioGroup>
   <BHRadio value="block 0" style={{display: 'block'}}> value = 0</BHRadio>
   <BHRadio value="block 1" style={{display: 'block'}}> value = 1</BHRadio>
   <BHRadio value="block 2" style={{display: 'block'}}> value = 2</BHRadio>
</RadioGroup>
`

]

class RadioComponent extends React.Component {
   constructor(props) {
      super(props);
      this._table = 0;
   }

   render() {
      return (
         <div className={'component'}>
            <TextPane title="Radio 示例"></TextPane>
            <FlexBox>
               <FlexItem className={'col-xs-12 col-sm-6'}>
                  <Example title={"BHRadio"}  description="BHRadio 的基本用法。" code={codes[0]}>
                     <BHRadio value= "this is test radio" />
                     <BHRadio value= "this is test radio">test radio</BHRadio>
                     <BHRadio value="test" checked={true} > 默认选中 </BHRadio>
                  </Example>
                  <Example title={"RadioGroup block"}  description="block 互斥的 radio" code={codes[2]} >
                     <RadioGroup onChange={(e) => {alert(e.target.value)}}>
                        <BHRadio value="block 0" style={{display: 'block'}}> value = 0</BHRadio>
                        <BHRadio value="block 1" style={{display: 'block'}}> value = 1</BHRadio>
                        <BHRadio value="block 2" style={{display: 'block'}}> value = 2</BHRadio>
                     </RadioGroup>
                  </Example>
               </FlexItem>
               <FlexItem className={'col-xs-12 col-sm-6'}>
                  <Example title={"RadioGroup inline"} code={codes[1]} description={'inline 互斥的 radio'}>
                     <RadioGroup value={"0"}>
                        <BHRadio value="0"> value = 0</BHRadio>
                        <BHRadio value="1"> value = 1</BHRadio>
                        <BHRadio value="2"> value = 2</BHRadio>
                     </RadioGroup>
                  </Example>
               </FlexItem>
            </FlexBox>

            <TextPane title={"BHRadio API"} />
            {utils.UIUtil.createTable(RadioComponent.tables[0], 'selectApi')}
            <TextPane>其他可用属性都会直接传递给{"<BHRadio/>"}</TextPane>

            <TextPane title={"RadioGroup API"} />
            {utils.UIUtil.createTable(RadioComponent.tables[1], 'selectOptionApi')}
         </div>
      )
   }
}

RadioComponent.tables = [
   [
      [
         "className",
         "自定义的class。",
         "string",
         "无"
      ], [
         "value",
         "value 属性，必需。",
         "any",
         "无"
      ],[
         "checked",
         "checked 属性，可选值：true, false",
         "boolean",
         "false"
      ], [
         "disabled",
         "disabled 属性，可选值：true, false",
         "boolean",
         "false"
      ], [
         "iconType",
         "icon 的类型，可选值：default",
         "string",
         "default"
      ], [
         "iconStyle",
         "icon 的 style属性",
         "object",
         "无"
      ], [
         "style",
         "style 属性",
         "object",
         "无"
      ], [
         "onChange",
         "onChange event",
         "function",
         "无"
      ]
   ], [
      [
         "className",
         "自定义的class。",
         "string",
         "无"
      ], [
         "value",
         "value 属性，当前 radio 选中值",
         "any",
         "无"
      ], [
         "style",
         "style 属性",
         "object",
         "无"
      ], [
         "onChange",
         "Radio onChange event",
         "function",
         "无"
      ]
   ]
];

export default RadioComponent