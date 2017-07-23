import BHUtil from 'beehive/util/BHUtil';
import {PREFIX} from '../variables';
import React from 'react';
import PropTypes from 'prop-types';

class BHSelect extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         lineHeight: null,
         value: props.value || props.placeholder,
         isOpen: false,
         optionsPos: null,
         optionItem: null
      }

   }

   componentDidMount() {
      const st = {};
      st['lineHeight'] = this.refs.selectContainer.offsetHeight - 2 + 'px';
      this.setState(st);
   }

   render() {
      const {style, className} = this.props;
      const {lineHeight, value, isOpen} = this.state;

      return (
         <div ref="selectContainer" className={BHUtil.combineClassnames(BHSELECT_CONTAINER_CLASSNAME, className, {'select-active': isOpen})}
            style={{...style, lineHeight: lineHeight}}
         >
            <div className="select-container" onClick={this.clickHandle}>
               <span className="select-label">{value}</span>
               <i className={BHUtil.combineClassnames('iconfont icon-down',{'is-open': isOpen})}></i>
            </div>
            <div ref="selectOptionsContainer"
               className={BHUtil.combineClassnames('option-container',{'options-open': isOpen})}
               style={this.setOptionsStyle()}
            >
               {this.createOptions(this.props.children)}
            </div>
         </div>
      )
   }

   createOptions = (options) => {
      return (
         options.map((option, key) => {
            return(
               <div className={BHUtil.combineClassnames('option-container-item',{'item-selected': this.state.optionItem == `${key}${option.props.value}`})}
                  key={`selectOtion${key}${option.props.value}`} value={option.props.value}
                  onClick={() => {this.optionClickHandle(option.props.value, option.props.children, `${key}${option.props.value}`)}}
               >
                  {option.props.children}
               </div>
            )
         })
      )
   }

   setOptionsStyle = () => {
      const style = {};

      if(this.state.optionsPos == 'top') {
         style['bottom'] = `${this.refs.selectContainer.offsetHeight + 2}px`;
         style['transformOrigin'] = "bottom center";

      }
      else if(this.state.optionsPos == 'down') {
         style['top'] = `${this.refs.selectContainer.offsetHeight + 1}px`;
      }
      else {
         return {}
      }

      return style;
   }

   setOptionsShow = (res) => {
      this.setState({
         isOpen: res
      })
   }

   clickHandle = () => {
      if(!this.state.isOpen) {
         const distance = BHUtil.getToScreenDistance(this.refs.selectContainer);
         const selectHeight = this.refs.selectContainer.offsetHeight;
         const optionContainerHeight = this.refs.selectOptionsContainer.offsetHeight;

         if(distance.y - selectHeight > optionContainerHeight) {
            this.setState({
               optionsPos: 'down'
            })
         }else{
            this.setState({
               optionsPos: 'top'
            })
         }
         BHUtil.addListener(document, 'click', this.hideOptions);
         this.setOptionsShow(true);
      }
      else {
         BHUtil.removeListener(document, 'click', this.hideOptions)
         this.setOptionsShow(false);
      }
   }

   hideOptions = () => {
      this.setOptionsShow(false);
      BHUtil.removeListener(document, 'click', this.hideOptions)
   }

   optionClickHandle = (value, label, key) =>{
      if(this.props.onChange && key != this.state.optionItem) {
         this.props.onChange(value)
      }

      this.setState({
         value: label,
         optionItem: key
      })
   }

}

BHSelect.propTypes = {
   className: PropTypes.string,
   placeholder: PropTypes.string,
   style: PropTypes.object
   // showNum: PropTypes.number,
   // value: PropTypes.oneOfType([
   //       PropTypes.string,
   //       PropTypes.number
   //    ])
}

BHSelect.defaultProps = {
   placeholder: "",
   // showNum: 10

}

class Option extends React.Component {
   constructor(props) {
      super(props);

   }

   render() {
      return null
   }

}

const BHSELECT_CONTAINER_CLASSNAME = `${PREFIX}-select-container`;

BHSelect.option = Option;
export default BHSelect;