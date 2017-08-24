import {Flex} from 'antd-mobile';
import React from 'react';

class FooterComponent extends React.Component {
   render() {
      return (
         <div className="footer-container">
            <Flex className="footer-container-flex">
               <Flex.Item className="logo-container">
                  <img src="static/logo_ford.jpg" className="logo-ford"/>
                  <img src="static/logo_yu.jpg" className="logo-yu"/>
                  <img src="static/logo_jmc.jpg" className="logo-jmc"/>
               </Flex.Item>
               <Flex.Item className="skip-container">
                  <a href="http://www.jmc.com.cn/">车辆和促销详情请点击</a>
               </Flex.Item>
            </Flex>
         </div>
      )
   }
}

export default FooterComponent;