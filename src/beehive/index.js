import FlexBox from './grid/FlexBox';
import FlexItem from './grid/FlexItem';
import * as Button from './button/';
import BHTree from './tree/BHTree';
import BHInput from './input/BHInput';
import NumberInput from './input/NumberInput';
import BHCheckBox from './checkbox/BHCheckBox';
import BHSwitch from './checkbox/BHSwitch';

import './index.less';

module.exports = {
   FlexBox,
   FlexItem,
   ...Button,
   BHTree,
   BHInput,
   NumberInput,
   BHCheckBox,
   BHSwitch
}