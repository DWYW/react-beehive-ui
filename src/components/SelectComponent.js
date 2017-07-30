import Example from 'common/Example';
import TextPane from 'common/TextPane';
import utils from 'common/utils/';
import {BHSelect, FlexBox, FlexItem} from 'beehive';
import React from 'react';

let codes = [`<BHSelect>
  <BHSelect.option value='0'>test1</BHSelect.option>
  <BHSelect.option value='1'>test2</BHSelect.option>
  <BHSelect.option value='2'>test3</BHSelect.option>
</BHSelect>

<BHSelect>
  <BHSelect.option value='0'>test1</BHSelect.option>
  <BHSelect.option value='1'>test2</BHSelect.option>
  <BHSelect.option value='2'>test3</BHSelect.option>
  <BHSelect.option value='3'>test4</BHSelect.option>
  <BHSelect.option value='4'>test5</BHSelect.option>
  <BHSelect.option value='5'>test6</BHSelect.option>
  <BHSelect.option value='6'>test7</BHSelect.option>
</BHSelect>
`,`<BHSelect className="primary" placeholder="pleace select">
  <BHSelect.option value='0'>test1</BHSelect.option>
  <BHSelect.option value='1'>test2</BHSelect.option>
  <BHSelect.option value='2'>test3</BHSelect.option>
</BHSelect>`

]

class SelectComponent extends React.Component {
   constructor(props) {
      super(props);
      this._table = 0;
   }

   render() {
      return (
         <div className={'component'}>
            <TextPane title="select示例"></TextPane>
            <FlexBox>
               <FlexItem className={'col-xs-12 col-sm-6'}>
                  <Example title={"默认"}  description="默认效果 select 的代码示例。" code={codes[0]}>
                     <BHSelect>
                        <BHSelect.option value='0'>test1</BHSelect.option>
                        <BHSelect.option value='1'>test2</BHSelect.option>
                        <BHSelect.option value='2'>test3</BHSelect.option>
                     </BHSelect>
                     <BHSelect>
                        <BHSelect.option value='0'>test1</BHSelect.option>
                        <BHSelect.option value='1'>test2</BHSelect.option>
                        <BHSelect.option value='2'>test3</BHSelect.option>
                        <BHSelect.option value='3'>test4</BHSelect.option>
                        <BHSelect.option value='4'>test5</BHSelect.option>
                        <BHSelect.option value='5'>test6</BHSelect.option>
                        <BHSelect.option value='6'>test7</BHSelect.option>
                     </BHSelect>
                  </Example>
               </FlexItem>
               <FlexItem className={'col-xs-12 col-sm-6'}>
                  <Example title={"其他效果"} code={codes[1]} description={'其他效果 select 的代码示例。'}>
                     <BHSelect className="primary" placeholder="pleace select">
                        <BHSelect.option value='0'>test1</BHSelect.option>
                        <BHSelect.option value='1'>test2</BHSelect.option>
                        <BHSelect.option value='2'>test3</BHSelect.option>
                     </BHSelect>

                     <BHSelect className="primary" placeholder="pleace select">
                        <BHSelect.option value='0'>test1</BHSelect.option>
                        <BHSelect.option value='1'>test2</BHSelect.option>
                        <BHSelect.option value='2' selected="selected">test3</BHSelect.option>
                     </BHSelect>

                  </Example>
               </FlexItem>
            </FlexBox>

            <TextPane title={"Select API"} />
            {utils.UIUtil.createTable(SelectComponent.tables[0], 'selectApi')}
            <TextPane>其他可用属性都会直接传递给{"<BHSelect></BHSelect>"}</TextPane>

            <TextPane title={"Select.option API"} />
            {utils.UIUtil.createTable(SelectComponent.tables[1], 'selectOptionApi')}
         </div>
      )
   }
}

SelectComponent.tables = [
   [
      [
         "className",
         "自定义的class。",
         "string",
         "无"
      ], [
         "placeholder",
         "没有选择时的默认提示。",
         "string",
         "\"\""
      ]
   ], [
      [
         "value",
         "选项的值。",
         "string | number",
         "\"\""
      ], [
         "label",
         "选项值对应的label值。",
         "string",
         "\"\""
      ], [
         "selected",
         "是否是默认值",
         "string | boolean",
         "无"
      ]
   ]
];

export default SelectComponent