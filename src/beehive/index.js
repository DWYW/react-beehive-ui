import FlexBox from './grid/FlexBox';
import FlexItem from './grid/FlexItem';
import * as Button from './button/';
import BHTree from './tree/BHTree';
import BHInput from './input/BHInput';
import NumberInput from './input/NumberInput';
import BHCheckBox from './checkbox/BHCheckBox';
import BHSwitch from './checkbox/BHSwitch';
import BHRadio from './radio/BHRadio';
import RadioGroup from './radio/RadioGroup';
import BHSelect from  './select/BHSelect';
import Notification from './notification/';
import Dialog from './dialog/'

import './index.less';

module.exports = {
   FlexBox,
   FlexItem,
   ...Button,
   BHTree,
   BHInput,
   NumberInput,
   BHCheckBox,
   BHSwitch,
   BHRadio,
   RadioGroup,
   BHSelect,
   Notification,
   Dialog
}