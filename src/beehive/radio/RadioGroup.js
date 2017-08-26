import BHRadio from "./BHRadio";
import React from 'react';
import PropTypes from 'prop-types';

class RadioGroup extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         value: props.value
      }
   }

   render() {
      const {className, style, children} = this.props;

      return (
         <div className={className} style={style}>
            {children.map((child, key) => {
               const checked =child.props.value && this.props.value && child.props.value == this.state.value ?
                  {checked: true} : {checked: false};

               return (
                  <BHRadio key={`${child.props.value || child.props.children}${key}`}
                     {...child.props} {...checked} onChange={this._onChange} />
               )
            })}
         </div>
      )
   }

   /**
    * onChange handle event.
    */
   _onChange = (e) => {
      this.setState({
         value: e.target.value
      })

      if(this.props.onChange) {
         this.props.onChange(e);
      }
   }
}

RadioGroup.propTypes = {
   className: PropTypes.string,
   style: PropTypes.object,
   value: PropTypes.any,
   onChange: PropTypes.func
}

export default RadioGroup