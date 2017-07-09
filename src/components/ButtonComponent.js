import Example from 'common/Example';
import TextPane from 'common/TextPane';
import i18n from  'i18n/'
import {BHButton, FlexBox, FlexItem} from 'beehive';
import React from 'react';
// import PropTypes from 'prop-types';

let codes = [`<BHButton>default</BHButton>
<BHButton className="primary">primary</BHButton>
<BHButton className="warning">warning</BHButton>
<BHButton className="success">success</BHButton>
<BHButton className="error">error</BHButton>
`,

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
               <p>button效果有俩种，一种是普遍的点击效果，一种是带特殊效果的。</p>
            </TextPane>

            <TextPane title="button示例"></TextPane>
            <FlexBox>
               <FlexItem className={'col-xs-12 col-sm-6'}>
                  <Example title={"普通效果"}  description="普通效果button的代码示例。" code={codes[0]}>
                     <BHButton>default</BHButton>
                     <BHButton className="primary">primary</BHButton>
                     <BHButton className="warning">warning</BHButton>
                     <BHButton className="success">success</BHButton>
                     <BHButton className="error">error</BHButton>
                  </Example>
               </FlexItem>
               <FlexItem className={'col-xs-12 col-sm-6'}>
                  <Example title={"button"} code={codes[0]} description={'description'}>
                     <BHButton animation={true} >primary</BHButton>
                     <BHButton animation={true}>default</BHButton>
                     <BHButton className="primary" animation={true}>primary</BHButton>
                     <BHButton className="warning" animation={true}>warning</BHButton>
                     <BHButton className="success" animation={true}>success</BHButton>
                     <BHButton className="error" animation={true}>error</BHButton>

                  </Example>
               </FlexItem>
            </FlexBox>
         </div>

      )
   }
}

export default ButtonComponent