class Cookie {
   /**
    * Set Cookie.
    */
   static setCookie(name, value, days = 7) {
      const exp = new Date();
      exp.setTime(exp.getTime() + days*24*60*60*1000);
      document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString();
   }

   /**
    * Get Cookie.
    */
   static getCookie(name) {
      let arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");

      if(arr=document.cookie.match(reg)) {
         return unescape(arr[2]);
      }

      return null;
   }

   /**
    * Get Cookie.
    */
   static rmCookie(name) {
      const exp = new Date();
      exp.setTime(exp.getTime() - 1);
      const cval=Cookie.getCookie(name);
      if(cval!=null) {
         document.cookie= name + "="+cval+";expires="+exp.toGMTString();
      }
   }

}

export default Cookie;