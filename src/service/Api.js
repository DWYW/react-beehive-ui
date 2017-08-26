import ApiUtil from 'common/utils/ApiUtil';

export const API = "http://api.alpha-car.cn";
export const api = "http://api.project.alpha-car.cn/bw_test";
export const tokenName = "170828_token_name";
export const alphaTokenName = "170828_alpha_token_name";
export const isFirstEntry = "170828_active_entry";
export const isFirstScanCode = "170828_active_scan_code";
export const shareTime = "170828_active_share_time";
export const clearTime = "170828_clear_time_0637872";

export const service = {
   /**
    * Get user info for wx.
    */
   getWxUserInfo: (tokenName) => {
      const _tokenName = ApiUtil.getToken(tokenName);
      return ApiUtil.axios(_tokenName).get(API+'/users/me').then((data) => {
         return data.data;
      })
   },

   /**
    * Get user info for active.
    */
   getUserInfo: (options = {}) => {
      return ApiUtil.axios().post(api+'/fe/dsf/user/me?token=eNAMdLpcevtTKDekPCtPYVZ3aNyJEHdf', options).then((data) => {
         return data.data;
      })
   },

   /**
    * Get user info for active.
    */
   getSignature: (options = {}, official_id) => {
      return ApiUtil.axios().post(`${API}/officials/${official_id}/signature`, options).then((data) => {
         return data.data;
      })
   },

   /**
    * Get my friend present list.
    */
   getPresentListForMe: (options = {}) => {
      return ApiUtil.axios().post(api+'/fe/dsf/user/winList?token=eNAMdLpcevtTKDekPCtPYVZ3aNyJEHdf', options).then((data) => {
         return data.data;
      })
   },

   /**
    * Send sms.
    */
   sendSms: (options = {}) => {
      return ApiUtil.axios().post(api+'/fe/sms/send?token=eNAMdLpcevtTKDekPCtPYVZ3aNyJEHdf', options).then((data) => {
         return data.data;
      })
   },

   /**
    * Get shops.
    */
   getShops: (options = {}) => {
      return ApiUtil.axios().post(api+'/fe/dsf/dealer/list?token=eNAMdLpcevtTKDekPCtPYVZ3aNyJEHdf', options).then((data) => {
         return data.data;
      })
   },

   /**
    * Get brands.
    */
   getBrands: (options = {}) => {
      return ApiUtil.axios().get(api+'/fe/dsf/dealer/brand?token=eNAMdLpcevtTKDekPCtPYVZ3aNyJEHdf').then((data) => {
         return data.data;
      })
   },

   /**
    * Check phoneNumber.
    */
   checkPhoneNumber: (options = {}) => {
      return ApiUtil.axios().post(api+'/fe/dsf/user/validMobile?token=eNAMdLpcevtTKDekPCtPYVZ3aNyJEHdf', options).then((data) => {
         return data.data;
      })
   },

   /**
    * comfirmOrder.
    */
   comfirmOrder: (options = {}) => {
      return ApiUtil.axios().post(api+'/fe/dsf/clue/order?token=eNAMdLpcevtTKDekPCtPYVZ3aNyJEHdf', options).then((data) => {
         return data.data;
      })
   },

   /**
    * Get roses.
    */
   getRoses: (options = {}) => {
      return ApiUtil.axios().post(api+'/fe/dsf/user/win?token=eNAMdLpcevtTKDekPCtPYVZ3aNyJEHdf', options).then((data) => {
         return data.data;
      })
   },

   /**
    * Get rank list.
    */
   getRankList: (options = {}) => {
      return ApiUtil.axios().post(api+'/fe/dsf/user/statistics?token=eNAMdLpcevtTKDekPCtPYVZ3aNyJEHdf', options).then((data) => {
         return data.data;
      })
   },

   /**
    * Pay money list.
    */
   payMoney: (options = {}) => {
      return ApiUtil.axios().post(api+'/fe/dsf/pay/recharge?token=eNAMdLpcevtTKDekPCtPYVZ3aNyJEHdf', options).then((data) => {
         return data.data;
      })
   },

}