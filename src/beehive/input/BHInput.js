import {PREFIX} from '../variables';
import BHUtil from '../util/BHUtil';
import React from 'react';
import PropTypes from 'prop-types';

class BHInput extends React.Component {

   render() {
      const {className, prevIcon, prevIconStyle, nextIcon, nextIconStyle, ...restProps} = this.props;

      return (
         <div className={BHUtil.combineClassnames(BHINPUT_CONTAINER_CLASSNAME, className)}>
            {prevIcon &&
               <i className={BHUtil.combineClassnames('iconfont', prevIcon, {'input-prev-icon': prevIcon})}
                  style={prevIconStyle}></i>
            }
            <input
               className={BHUtil.combineClassnames(BHINPUT_CLASSNAME,{
                  'hasIcon-prev': prevIcon,
                  'hasIcon-next': nextIcon
               })} {...restProps}/>
            {nextIcon &&
               <i className={BHUtil.combineClassnames('iconfont', nextIcon, {'input-next-icon': nextIcon})}
                  style={nextIconStyle}></i>
            }
         </div>
      )
   }

}

BHInput.propTypes = {
   className: PropTypes.string,
   prevIcon: PropTypes.string,
   prevIconStyle: PropTypes.object,
   nextIcon: PropTypes.string,
   nextIconStyle: PropTypes.object

}

BHInput.defaultProps = {
   type: 'text'
}

const BHINPUT_CONTAINER_CLASSNAME = `${PREFIX}-input-container`
const BHINPUT_CLASSNAME = `${PREFIX}-input`
export default BHInput;