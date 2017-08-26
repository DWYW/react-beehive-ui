export default class BHUtil {
   /**
    * Combine classnames.
    */
   static combineClassnames() {
      let classnames = []

      for(let key in arguments) {
         if(typeof arguments[key] === 'string') {
            classnames.push(arguments[key]);
         }
         else if(arguments[key] instanceof Array) {
            classnames = classnames.concat(arguments[key]);
         }
         else if(arguments[key] instanceof Object) {
            for (let itemKey in arguments[key]) {
               if(arguments[key][itemKey]) {
                  classnames.push(itemKey);
               }
            }
         }
      }

      return classnames.join(" ");
   }

   /**
    * DOM add event listener.
    */
   static addListener(target, type, listener, useCapture = false) {
      if(target.addEventListener) {
         target.addEventListener(type, listener, useCapture);
      }
      else if(target.attachEvent) {
         target.attachEvent(`on${type}`, listener, useCapture);
      }
      else {
         target[`on${type}`] = listener;
      }
   }

   /**
    * DOM remove event listener.
    */
   static removeListener(target, type, listener, useCapture = false) {
      if(target.removeEventListener) {
         target.removeEventListener(type, listener, useCapture);
      }
      else if(target.detachEvent) {
         target.detachEvent(`on${type}`, listener, useCapture);
      }
      else {
         target[`on${type}`] = null;
      }
   }

   /**
    * Get dom offset left and top.
    */
   static getOffset(target) {
      if(!target) {
         return null;
      }

      let left = 0, top = 0, parent = target.offsetParent;
      left += target.offsetLeft;
      top += target.offsetTop;

      while(parent) {
         left += parent.offsetLeft;
         top += parent.offsetTop;
         parent = parent.offsetParent
      }

      return {left: left, top: top}
   }

   static mouseIn(event, target, includeBoundary = true) {
      const mousePos = BHUtil.getMousePos(event);
      const targetOffset = BHUtil.getOffset(target);

      if(!mousePos || !targetOffset) {
         return false;
      }
      else {
         const targetMax = {
            x: targetOffset.left + target.offsetWidth,
            y: targetOffset.top + target.offsetHeight
         }

         if(includeBoundary && (
            mousePos.x <= targetMax.x && mousePos.y <= targetMax.y && mousePos.x >= targetOffset.left && mousePos.y >= targetOffset.top))
         {
            return true;
         }
         else if(!includeBoundary && (
            mousePos.x < targetMax.x && mousePos.y < targetMax.y && mousePos.x > targetOffset.left && mousePos.y > targetOffset.top))
         {
            return true;
         }
         else {
            return false;
         }
      }

   }

   /**
    * Get mouse postion.
    */
   static getMousePos(event) {
      if(!event) {
         return null
      }

      let x = 0, y = 0;

      if(event.pageX && event.pageY) {
         x = event.pageX;
         y = event.pageY;
      }
      else {
         x = event.clientX + document.body.scrollLeft - document.body.clientLeft;
         y = event.clientY + document.body.scrollTop - document.body.clientTop;
      }

      return {x, y}
   }

   /**
    * Stop propagation for react.
    */
   static stopPropagation(event) {
      event.preventDefault();
      event.nativeEvent.stopImmediatePropagation();
   }

   /**
    * Get to screen Distance.
    */
   static getToScreenDistance(target) {
      if(!target) {
         return null
      }

      const offset = BHUtil.getOffset(target);
      const height = target.offsetHeight;
      const width = target.offsetWidth;
      const distance = {
         x: Math.max(window.screen.availWidth, document.documentElement.clientWidth) - (offset.left -  Math.max(document.body.scrollLeft, document.documentElement.scrollLeft)) - width,
         y: Math.max(window.screen.availHeight, document.documentElement.clientHeight) - (offset.top -  Math.max(document.body.scrollTop, document.documentElement.scrollTop)) - height
      }

      return distance
   }

   /**
    * Is mobile.
    */
   static isMobile() {
      const userAgentInfo = navigator.userAgent;
      const Agents = new Array("Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod");
      let flag = false;

      for (let v = 0; v < Agents.length; v++) {
         if (userAgentInfo.indexOf(Agents[v]) > 0) { flag = true; break; }
      }

      return flag;
   }

   /**
    * Is weixin.
    */
   static isWeChat() {
      if(navigator.userAgent.indexOf('MicroMessenger') > -1) {
         return true;
      }
      else {
         return false;
      }
   }

}