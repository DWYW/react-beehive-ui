export default class RootSize {
   /**
    *  Determine browser type.
    */
   static isBrowser(browser) {
      const userAgent = window.navigator.userAgent;
      const reg = new RegExp(`${browser}`, 'ig');
      return userAgent.match(reg)
   }

   /**
    *  Get device pixel ratio.
    */
   static getDevicePixelRatio() {
      let devicePixelRatio = null;
      const isIOS = RootSize.isBrowser('iphone');
      let {width} = RootSize.mountBrowserSize();

      if (window.devicePixelRatio) {
         devicePixelRatio = window.devicePixelRatio;
      }
      else {
         devicePixelRatio = isIOS ? width > 818 ? 3 : width > 480 ? 2 : 1 : 1;
      }

      return devicePixelRatio;
   }

   /**
    *  Set Html element font-size.
    */
   static setRootSize() {
      const isIOS = RootSize.isBrowser('iphone');
      const isYIXIN = RootSize.isBrowser('yixin');
      const is2345 = RootSize.isBrowser('Mb2345');
      const ishaosou = RootSize.isBrowser('mso_app');
      const isSogou = RootSize.isBrowser('sogoumobilebrowser');
      const isLiebao = RootSize.isBrowser('liebaofast');
      const isGnbr = RootSize.isBrowser('GNBR');
      // let {width, height} = RootSize.mountBrowserSize();
      let {width} = RootSize.mountBrowserSize();

      if(isIOS) {
         width = screen.width;
         // height = screen.height;
      }

      // if(width > height){
      //    width = height;
      // }

      //页面宽度大于1080，则font-size为144px，否则为width / 7.5, 7.5表示设计稿是以750px宽设计的
      let fontSize = width > 1080 ? 144 : width / 7.5;
      fontSize = fontSize > 32 ? fontSize : 32;

      // YIXIN 和 2345 这里有个刚调用系统浏览器时候的bug，需要一点延迟来获取
      if(isYIXIN || is2345 || ishaosou || isSogou || isLiebao || isGnbr) {
         setTimeout(() => {
            let {width} = RootSize.mountBrowserSize();
            let fontSize = width > 1080 ? 144 : width / 7.5;
            fontSize = fontSize > 32 ? fontSize : 32;
            document.getElementsByTagName('html')[0].style.fontSize = fontSize + 'px';
         },500);
      }
      else {
         document.getElementsByTagName('html')[0].style.fontSize = fontSize + 'px';
      }
   }

   /**
    *  Mount browser size.
    */
   static mountBrowserSize() {
      let width = screen.width > 0 ? (
         (window.innerWidth >= screen.width || window.innerWidth == 0) ? screen.width : window.innerWidth
      ) : (
         window.innerWidth
      );

      let height = (screen.height > 0) ? (
         (window.innerHeight >= screen.height || window.innerHeight == 0) ? screen.height : window.innerHeight
      ) : (
         window.innerHeight
      );

      return {
         width: width,
         height: height
      }
   }

   /**
    *  Set meta viewport.
    */
   static setViwePort() {
      const content = `initial-scale=${1/RootSize.getDevicePixelRatio()}, maximum-scale=${1/RootSize.getDevicePixelRatio()}, user-scalable=no`;
      let metas = document.getElementsByTagName('meta');

      for(let meta in metas) {
         if(metas[meta].getAttribute && metas[meta].getAttribute('name') == 'viewport') {
            metas[meta].setAttribute("content", content)
         }
      }
   }
}