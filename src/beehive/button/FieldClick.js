import React from 'react';
import './FieldClick.less';

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

      window.setTimeout(()=>{
         this._deleteElement()
      }, 1190)
   }

   _deleteElement(){
      const animation = this.state.animation;
      animation.pop();
      this.setState({
         animation: animation
      })
   }

   // _getElement(e) {
   //    const style = {};
   //    style.width = this.FieldClick.offsetWidth + Math.abs(offset.x) * 2;
   //    style.height = '200px';
   //    style.left = offset.x;
   //    style.top = offset.y - (200 - this.FieldClick.offsetheight) / 2;
   //    return <div key={new Date()} className={ANIMATION_ITEM_CLASSNAME} style={style} />
   // }

   _getPoint(e) {
      if(e.pageX && e.pageY){
         return {x: e.pageX, y: e.pageY}
      }
   }

   _mountPoint(pos){
      const count = ++this.count;
      const x = pos.x - this.FieldClick.offsetWidth / 2 - this.FieldClick.offsetLeft;
      const y = pos.y - this.FieldClick.offsetHeight / 2 - this.FieldClick.offsetTop;
      return {x: x, y: y, count: count}
   }

   render() {
      const {animation} = this.state;
      return (
         <div ref={FieldClick => this.FieldClick = FieldClick} className={CLICK_FIELD_CLASSNAME} {...this.props} onClick={e =>{this._clickEvent(e);}}>
            <div className={ANIMATION_CLASSNAME}>
               {animation.map((item, key) => {
                  const style = {};
                  // style.width = this.FieldClick.offsetWidth + Math.abs(item.x) * 2;
                  style.width = '100%';
                  style.height = '150px';
                  style.left = item.x;
                  style.top = item.y - (150 - this.FieldClick.offsetHeight) / 2;
                  return <div key={item.count} className={ANIMATION_ITEM_CLASSNAME} style={style} />
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