import {FlexBox, FlexItem} from 'beehive';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import Highlight from './Highlight';
import React from 'react';

class Example extends React.Component {
   constructor(props) {
      super(props);
      this.handleClick = this.handleClick.bind(this);
      this.state = {
         codeToggle: false
      }
   }

   handleClick() {
      if(!this.props.code) {
         return;
      }

      this.setState(()=>{
         return {
            codeToggle: !this.state.codeToggle
         }
      })
   }

   render() {
      return (
         <div className="base-example">
            <div className="example-container">
               <i className="iconfont icon-link" onClick={this.handleClick}></i>
               <FlexBox>
                  <FlexItem className={'col-xs-12 example-example'}>{this.props.children}</FlexItem>
                  {this.props.description &&
                     <FlexItem className={"col-xs-12 example-descrition"}>
                        <span>{this.props.title}</span>
                        {this.props.description}
                     </FlexItem>
                  }
                  {this.props.code &&
                     <FlexItem className={classnames('col-xs-12 example-code', {hide: !this.state.codeToggle})}>
                        <Highlight>{this.props.code}</Highlight>
                     </FlexItem>
                  }
               </FlexBox>
            </div>
         </div>
      )
   }
}

Example.propTypes = {
   title: PropTypes.string,
   code: PropTypes.string
}

export default Example