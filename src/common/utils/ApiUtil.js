import axios from 'axios';
import moment from 'moment';

export default class ApiUtil {
   /**
    * Get token.
    */
   static getToken(tokenName) {
      return localStorage.getItem(tokenName);
   }

   /**
    * Set token.
    */
   static setToken(api, tokenName, officialId, redirect = null, scope = 'snsapi_userinfo') {
      if(ApiUtil.getToken(tokenName)) {
         return false;
      }

      const token = ApiUtil.getQueryValue('access_token');

      if(!token) {
         if(redirect) {
            window.location.href = `${api}/users/authentication?scope=${scope}&official_id=${officialId}&redirect=${redirect}`;
         }
         else {
            window.location.href = `${api}/users/authentication?scope=${scope}&official_id=${officialId}`;
         }
         return false

      }
      else {
         localStorage[tokenName] = token;

         if(window.location.search.substring(0,1) == "?") {
            let href = window.location.href.replace(`&access_token=${token}`, '');
            window.location.href = href;
            return false;
         }
         else {
            window.location.href = window.location.href.replace(`access_token=${token}`, '');
            return false;
         }

      }
   }

   /**
    * Get query value.
    */
   static getQueryValue(key, search = window.location.search) {
      return decodeURIComponent(search.replace(new RegExp("^(?:.*[&\\?]" + encodeURIComponent(key).replace(/[\.\+\*]/g, "\\$&") + "(?:\\=([^&]*))?)?.*$", "i"), "$1"));
   }

   // /**
   //  * Get official_id.
   //  */
   static getOfficialId() {
      const key = "official_id";
      return ApiUtil.getQueryValue(key)
   }

   /**
    * Create axios.
    */
   static axios(tokenName) {
      if(tokenName) {
         return axios.create({
            headers: {'X-Access-Token': tokenName}
         });
      }
      else {
         return axios.create();
      }
   }

   /**
    * share event.
    * {
    *    title: title,
    *    link: link,
    *    imgUrl: imgUrl,
    *    desc: desc,
    *    success: success,
    * }
    */
   static shareEvent(signature, config) {
      wx.config({
         debug: false,
         appId: signature.appId,//签名接口返回的值
         timestamp: signature.timestamp,
         nonceStr: signature.nonceStr,
         signature: signature.signature,
         jsApiList: [
            'checkJsApi',
            'onMenuShareTimeline',
            'onMenuShareAppMessage'
         ]
      });

      wx.ready(() => {
         wx.checkJsApi({
            jsApiList: [
               'onMenuShareTimeline',
               'onMenuShareAppMessage'
            ],
            success: () => {}
         });

         wx.onMenuShareTimeline({
            title: config.title, // 分享标题
            link: config.link, // 分享链接
            imgUrl: config.imgUrl, // 分享图标
            success: () => {
               if(config.success) {
                  config.success();
               }
            },
            cancel: () => {}
         });

         wx.onMenuShareAppMessage({
            title: config.title, // 分享标题
            link: config.link, // 分享链接
            imgUrl: config.imgUrl, // 分享图标
            desc: config.desc, // 分享描述
            success: () => {
               if(config.success) {
                  config.success();
               }
            }
         });

         wx.error((obj) => {
            alert(obj.errMsg);
         });
      });
   }

   static isToDay (date) {
      if(!date) {
         return false;
      }

      return moment().format('YYYYMMDD') == date;
   }

   /**
    * Mount days.
    */
   static mountDays() {
      const startDate = parseInt(moment("2017-08-24").format("YYYYMMDD"));
      const nowDate = parseInt(moment().format("YYYYMMDD"));
      const days = nowDate > startDate ? nowDate - startDate : 0;
      return days + 1;
   }
}