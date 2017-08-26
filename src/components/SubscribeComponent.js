import {service} from '../service/Api';
import Provinces from "common/Provinces";
import {Flex, Picker, Switch} from "antd-mobile";
import React from 'react';
import PropTypes from 'prop-types';

const PickerChild = props => (
   <div
      onClick={props.onClick}
      className="picker-child-container"
   >
      <div className="picker-child-body">
         <div className="picker-child-extra">{props.extra}</div>
         <div className="picker-child-children" >{props.children}</div>
      </div>
   </div>
);

class SubscribeComponent extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         provinces: [[]],
         brands: [[]],
         shops: [[]],
         province: null,
         switchState: props.switchState,
         brand: props.brand,
         shop: props.shop
      }
   }

   componentDidMount() {
      this.getProvinces();
      this.getBrands();
   }

   componentWillReceiveProps(nextProps) {
      const {switchState, brand, shop} = nextProps;

      this.setState({
         switchState, brand, shop
      })
   }

   shouldComponentUpdate(nextProps,nextState) {
      const {provinces, brands, shops, province} = nextState;
      const state = this.state;
      const {switchState, brand, shop} = nextProps;
      const props = this.props;

      if(switchState !== props.switchState || brand !== props.brand || shop !== props.shop ||
         province !== state.province || this.arrIsChanged(brands[0], state.brands[0]) ||
         this.arrIsChanged(shops[0], state.shops[0]) || this.arrIsChanged(provinces[0], state.provinces[0])
      ) {
         return true
      }

      return false;
   }

   render() {
      const {mobileAuth, switchState, brand, shop} = this.props;
      const {brands, shops, province} = this.state;

      return (
         <div className="subscribe-container mgt02">

            <div className="subscribe-body">
               {mobileAuth ==2 &&
                  <Flex>
                     <Flex.Item className="text-right">
                        <span className="get-coupon-label">愿意领取优惠券</span>
                        <Switch className="get-coupon-switch" checked={switchState} onChange={this.isInputClue} platform="ios"></Switch>
                     </Flex.Item>
                  </Flex>
               }

               {switchState &&
                  <Flex className="mgt02">
                     <Flex.Item className="item-label">意向品牌：</Flex.Item>
                     <Flex.Item>
                        <Picker
                           data={brands}
                           cascade={false}
                           extra={brand ? brand.label : "选择意向品牌"}
                           onChange={this.selectBrand}
                        >
                           <PickerChild>
                              <i className="iconfont icon-down"></i>
                           </PickerChild>
                        </Picker>
                     </Flex.Item>
                  </Flex>
               }

               {switchState &&
                  <Flex className="mgt02">
                     <Flex.Item className="item-label">经销店：</Flex.Item>
                     <Flex.Item className="get-province">
                        <Picker
                           data={this.state.provinces}
                           cascade={false}
                           extra={province ? province.label : "省"}
                           onChange={this.selectProvince}
                        >
                           <PickerChild/>
                        </Picker>
                     </Flex.Item>
                     <Flex.Item className="get-shop">
                        <Picker
                           data={shops}
                           cascade={false}
                           extra={shop ? shop.label : "选择经销店"}
                           onChange={this.selectShop}
                        >
                           <PickerChild> <i className="iconfont icon-down"></i> </PickerChild>
                        </Picker>
                     </Flex.Item>
                  </Flex>
               }
            </div>

         </div>
      )
   }

   /**
    * Get brands.
    */
   getBrands = async () => {
      const brands = await service.getBrands();
      let res = [];

      brands.data.map((item) => {
         res.push(Object.assign({},item,{value: item.id, label: item.name}));
      })

      this.setState({
         brands: [res]
      })
   }

   /**
    * Get provinces.
    */
   getProvinces = () => {
      var abled = ["100000", "120000", "140000", "180000", "320000"];
      const _provinces = [];
      Object.keys(Provinces).map((key) => {
         if(abled.indexOf(key) !==-1) {
            const province = {};
            province.value = key;
            province.label = Provinces[key].name;
            _provinces.push(province)
         }
      })

      this.setState({
         provinces: [_provinces]
      })
   }

   /**
    * Get shops.
    */
   getShops = async (province, brand) => {
      const shops = await service.getShops({
         province: province ? province.value : "",
         brand: brand ? brand.value : ""
      });

      const res = [];

      shops.data.map((item) => {
         res.push(Object.assign({},item,{value: item.id, label: item.name}));
      })

      this.setState({
         shops: [res]
      })
   }

   /**
    * Is input clue.
    */
   isInputClue = (state) => {
      this.props.callback({
         switchState: state,
         brand: this.state.brand,
         shop: this.state.shop
      })
   }

   /**
    * select brand event.
    */
   selectBrand = (values) => {
      const {brands, province} = this.state;
      const brand = this.getArrayItem(brands[0], values[0]);

      this.setState({
         brand: brand,
         shop: null
      }, () => {
         this.getShops(province, brand);
         this.props.callback({
            switchState: this.state.switchState,
            brand: brand,
            shop: this.state.shop
         })
      })
   }

   /**
    * select province event.
    */
   selectProvince = (values) => {
      const {provinces, brand} = this.state;
      const province = this.getArrayItem(provinces[0], values[0]);
      this.setState({
         province: province,
         shop: null
      }, () => {
         this.getShops(province, brand);
         this.props.callback({
            switchState: this.state.switchState,
            brand: brand,
            shop: this.state.shop
         })
      })
   }

   /**
    * select province event.
    */
   selectShop = (values) => {
      const {shops} = this.state;
      const shop = this.getArrayItem(shops[0], values[0]);

      this.props.callback({
         switchState: this.state.switchState,
         brand: this.state.brand,
         shop: shop
      })
   }

   /**
    * Get Array Item.
    */
   getArrayItem = (array, value) => {
      let res = null;
      array.map((item) => {
         if(item.value == value) {
            res = item;
         }
      })

      return res;
   }

   /**
    * Array is changed.
    */
   arrIsChanged(arr1, arr2, attr = "value") {
      if(arr1.length != arr2.length) {
         return true;
      }
      else {
         const len = Math.max(arr1.length, arr2.length);

         if(len == 0) {
            return false
         }
         else {
            for(let i = 0; i < len; i++) {
               if(arr1[i][attr] !== arr2[i][attr]) {
                  return true;
                  break;
               }
            }

            return false;
         }
      }

      return false;
   }

}

SubscribeComponent.propTypes = {
   clueAuth: PropTypes.any,
   switchState: PropTypes.bool,
   brand: PropTypes.any,
   shop: PropTypes.any,
   callback: PropTypes.func
}

export default SubscribeComponent;

// const brands = [
//    [
//       {
//          label: '品牌1',
//          value: "品牌1",
//       },
//       {
//          label: '品牌2',
//          value: '品牌2',
//       },
//    ]
// ];

// const shops = [
//    [
//       {
//          label: "云中展厅",
//          value: 0,
//       }
//    ]
// ]
