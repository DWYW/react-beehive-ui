import React from 'react';

class TextPane extends React.Component {
   constructor(props) {
      super(props);
   }

   _initClassName(className) {
      return className ? `text-pane ${className}` : `text-pane`;
   }

   render() {
      const {className, ...restProps} = this.props;

      return (
         <div className={this._initClassName(className)} {...restProps}>
            {this.props.title && <h3>{this.props.title}</h3>}
            {this.props.children &&
               <div className="text-container">{this.props.children}</div>
            }
         </div>
      )
   }
}

export default TextPane