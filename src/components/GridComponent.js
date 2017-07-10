import Example from 'common/Example';
import TextPane from 'common/TextPane';
import i18n from  'i18n/'
import {FlexBox, FlexItem} from 'beehive';
import React from 'react';

const codes = [`<FlexBox flexDirection="row" flexWrap="nowrap">
   <FlexItem style={{width: '25%', background: "#108ee9", color: "#ffffff"}}>
      <p>Example!</p>
   </FlexItem>
   <FlexItem style={{width: '25%', background: "#f0ad4e", color: "#ffffff"}}>
      <p>Example!</p><p>Example!</p>
   </FlexItem>
   <FlexItem style={{width: '25%', background: "#108ee9", color: "#ffffff"}}>
      <p>Example!</p><p>Example!</p><p>Example!</p>
   </FlexItem>
   <FlexItem style={{width: '25%', background: "#f0ad4e", color: "#ffffff"}}>
      <p>Example!</p><p>Example!</p><p>Example!</p><p>Example!</p>
   </FlexItem>
   <FlexItem style={{width: '25%', background: "#108ee9", color: "#ffffff"}}>
      <p>Example!</p><p>Example!</p><p>Example!</p><p>Example!</p><p>Example!</p>
   </FlexItem>
</FlexBox>`,
   `<FlexBox flexDirection="row" flexWrap="wrap">
   <FlexItem style={{width: '25%', background: "#108ee9", color: "#ffffff"}}>
      <p>Example!</p>
   </FlexItem>
   <FlexItem style={{width: '25%', background: "#f0ad4e", color: "#ffffff"}}>
      <p>Example!</p><p>Example!</p>
   </FlexItem>
   <FlexItem style={{width: '25%', background: "#108ee9", color: "#ffffff"}}>
      <p>Example!</p><p>Example!</p><p>Example!</p>
   </FlexItem>
   <FlexItem style={{width: '25%', background: "#f0ad4e", color: "#ffffff"}}>
      <p>Example!</p><p>Example!</p><p>Example!</p><p>Example!</p>
   </FlexItem>
   <FlexItem style={{width: '25%', background: "#f0ad4e", color: "#ffffff"}}>
      <p>Example!</p><p>Example!</p><p>Example!</p><p>Example!</p><p>Example!</p>
   </FlexItem>
</FlexBox>`
]

const descriptions = [
   `FlexBox, FlexItem 共同组成 Flex。`
]

class GridComponent extends React.Component {
   constructor(props) {
      super(props);
      this._example = "example";
   }

   render() {
      const createIner = (len, keyPrefix) => {
         const p = [];

         for(let i = 0; i < len; i++) {
            p.push(<p key={`${keyPrefix}-${i}`}>Example!</p>)
         }

         return p;
      }
      return (
         <div className={'component'}>
            <TextPane title={i18n.$t('gridLayout')}>
               <p>借用bootstrap的栅格布局思路，与flex结合实现栅格布局。</p>
               <p>col-xs-{'{num}'}, col-sm-{'{num}'}, col-md-{'{num}'}, col-lg-{'{num}'}.</p>
            </TextPane>
            <div className="table-container">
               <table cellSpacing="0">
                  <thead>
                     <tr>
                        <th></th>
                        <th>{"超小屏幕 手机 (<768px)"}</th>
                        <th>{"小屏幕 平板 (≥768px)"}</th>
                        <th>{"中等屏幕 桌面显示器 (≥992px)"}</th>
                        <th>{"大屏幕 大桌面显示器 (≥1200px)"}</th>
                     </tr>
                  </thead>
                  <tbody>
                     <tr>
                        <td>类前缀</td>
                        <td>col-xs-</td>
                        <td>col-sm-</td>
                        <td>col-md-</td>
                        <td>col-lg-</td>
                     </tr>
                     <tr>
                        <td>列数</td>
                        <td colSpan="4">12</td>
                     </tr>
                  </tbody>
               </table>
            </div>

            <TextPane title={"flex布局"} />
            <FlexBox>
               <FlexItem className={'col-xs-12 col-sm-6'}>
                  <Example title={i18n.$t('gridExampleTitle1')} code={codes[0]} description={descriptions[0]}>
                     <FlexBox flexDirection="row" flexWrap="nowrap">
                        {[1,2,5,4, 2].map((item, key) => {
                           return (
                              <FlexItem key={`example1-${key}`} style={key % 2 == 0 ? STYLE_PRIMSRY : STYLE_WRANING}>
                                 {createIner(item, `example1-${key}`)}
                              </FlexItem>
                           )
                        })}
                     </FlexBox>
                  </Example>
               </FlexItem>
               <FlexItem className={'col-xs-12 col-sm-6'}>
                  <Example title={i18n.$t('gridExampleTitle1')} code={codes[1]} description={descriptions[0]}>
                     <FlexBox flexDirection="row" flexWrap="wrap">
                        {[1,2,5,4, 2].map((item, key) => {
                           return (
                              <FlexItem key={`example2-${key}`} style={key % 2 == 0 ? key == 4 ? STYLE_WRANING : STYLE_PRIMSRY : STYLE_WRANING}>
                                 {createIner(item, `example2-${key}`)}
                              </FlexItem>
                           )
                        })}
                     </FlexBox>
                  </Example>
               </FlexItem>
            </FlexBox>

            <TextPane title={"FlexBox API"} />
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
                        <td>flexDirection</td>
                        <td>flex-direction,可选值：row, row-reverse, column, column-reverse</td>
                        <td>string</td>
                        <td>row</td>
                     </tr>
                     <tr>
                        <td>flexWrap</td>
                        <td>flex-wrap,可选值：nowrap, wrap, wrap-reverse</td>
                        <td>string</td>
                        <td>wrap</td>
                     </tr>
                     <tr>
                        <td>justifyContent</td>
                        <td>justify-content,可选值：flex-start, flex-end, center, space-between, space-around</td>
                        <td>string</td>
                        <td>flex-start</td>
                     </tr>
                     <tr>
                        <td>alignItems</td>
                        <td>align-item,可选值：flex-start, flex-end, center, baseline, stretch</td>
                        <td>string</td>
                        <td>stretch</td>
                     </tr>
                     <tr>
                        <td>alignContent</td>
                        <td>align-content,可选值：flex-start, flex-end, center, space-between, space-around, stretch</td>
                        <td>string</td>
                        <td>stretch</td>
                     </tr>
                  </tbody>
               </table>
            </div>

            <TextPane title={"FlexItem API"}>
               <p>FlexItem,默认css属性为：{"flex: 0 0 auto;box-sizing: border-box;"}</p>
            </TextPane>
         </div>
      )
   }
}

const STYLE_PRIMSRY = {
   width: '25%',
   background: "#108ee9",
   color: "#ffffff"
}

const STYLE_WRANING = {
   width: '25%',
   background: "#f0ad4e",
   color: "#ffffff"
}

export default GridComponent