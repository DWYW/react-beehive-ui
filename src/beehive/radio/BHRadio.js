import BHCheckBox from "../checkbox/BHCheckBox";
import PropTypes from 'prop-types';

class BHRadio extends BHCheckBox {
   /**
    * Get Icon type.
    */
   getIconType = (iconType) => {
      iconType = iconType in BHRadio.ICONS ? iconType : 'default';
      return BHRadio.ICONS[iconType];
   }
}

BHRadio.propTypes = {
   className: PropTypes.string,
   disabled: PropTypes.bool,
   checked: PropTypes.bool,
   iconStyle: PropTypes.object,
   iconType: PropTypes.string,
   style: PropTypes.object,
   onChange: PropTypes.func,
   value: PropTypes.any.isRequired,
   type: PropTypes.oneOf(["radio"])
}

BHRadio.defaultProps = {
   iconType: 'default',
   disabled: false,
   checked: false,
   type: "radio"
}

BHRadio.ICONS = {
   default: {
      default: 'icon-circle',
      checked: 'icon-radio'
   }
}

export default BHRadio;