import React from 'react';

class FieldClick extends React.Component {
   constructor(props) {
      super(props);
      this._clickEvent = this._clickEvent.bind(this);
      this._deleteElement = this._deleteElement.bind(this);
      this._getPoint = this._getPoint.bind(this);
      this.count = 0;
      this.state = {
         animation: []
      }
   }

   _clickEvent(e) {
      const animation = this.state.animation;
      animation.unshift(this._mountPoint(this._getPoint(e)))

      this.setState({
         animation: animation
      })

      window.setTimeout(() => {
         this._deleteElement()
      }, 500)
   }

   _deleteElement(){
      const animation = this.state.animation;
      animation.pop();
      this.setState({
         animation: animation
      })
   }

   _getPoint(e) {
      if(e.pageX && e.pageY) {
         return {x: e.pageX, y: e.pageY}
      }
      else {
         let x = e.clientX + Math.max(document.body.scrollLeft, document.documentElement.scrollLeft);
         let y = e.clientY + Math.max(document.body.scrollTop, document.documentElement.scrollTop);
         return {x, y}
      }
   }

   _getOffset(element){
      let left = 0, top = 0, parent = element.offsetParent;
      left += this.FieldClick.offsetLeft;
      top += this.FieldClick.offsetTop;

      while(parent) {
         left += parent.offsetLeft;
         top += parent.offsetTop;
         parent = parent.offsetParent
      }

      return {left: left, top: top}
   }

   _mountPoint(pos){
      const count = ++this.count;
      const offset = this._getOffset(this.FieldClick);
      const x = pos.x - offset.left - this.FieldClick.offsetWidth / 2;
      const y = pos.y - this.FieldClick.offsetHeight / 2 - offset.top;
      return {x: x, y: y, count: count}
   }

   render() {
      const {animation} = this.state;
      return (
         <div ref={FieldClick => this.FieldClick = FieldClick} className={CLICK_FIELD_CLASSNAME} {...this.props} onClick={e =>{this._clickEvent(e);}}>
            <div className={ANIMATION_CLASSNAME}>
               {animation.map((item) => {
                  const style = {};
                  style.width = '100%';
                  style.height = '120px';
                  style.left = item.x;
                  style.top = item.y - (120 - this.FieldClick.offsetHeight) / 2;
                  return <div key={`FieldClick${item.count}`} className={ANIMATION_ITEM_CLASSNAME} style={style} />
               })}
            </div>
            <div className={TEXT_CLASSNAME}>
               <div className={TEXT_INNER_CLASSNAME}>{this.props.children}</div>
            </div>
         </div>
      )
   }
}

const PREFIX = 'beehive';
const CLICK_FIELD_CLASSNAME = `${PREFIX}-field-click`;
const ANIMATION_CLASSNAME = `${PREFIX}-field-click-animation`;
const ANIMATION_ITEM_CLASSNAME = `${PREFIX}-field-click-animation-item`;
const TEXT_CLASSNAME = `${PREFIX}-field-click-text`;
const TEXT_INNER_CLASSNAME = `${PREFIX}-field-click-text-inner`;

export default FieldClick