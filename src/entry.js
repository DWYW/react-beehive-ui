import RootSize from 'common/RootSize';
import UIUtil from 'common/utils/UIUtil';
import routes from './router';
import RouteView  from 'common/RouteView';
import store from './store';
import {HashRouter as Router} from 'react-router-dom';
import {Provider} from 'react-redux';
import React from 'react';
import ReactDOM from 'react-dom';

import './styles/index.less';

class Root extends React.Component {
   componentDidMount() {
      RootSize.setRootSize();
      UIUtil.addListener(window, 'resize', this.updateRootFontSize);
   }

   componentWillUnmount() {
      UIUtil.removeListener(window, 'resize', this.updateRootFontSize);
   }

   render() {
      return (
         <div className={'root-route-view'}>
            <RouteView routes={routes} />
         </div>
      )
   }

   /**
    * Use css3 rem.
    * Update DOM root element (html element) font-size.
    */
   updateRootFontSize = () => {
      RootSize.setRootSize();
   }
}

ReactDOM.render(
   <Provider store={store}>
      <Router>
         <Root></Root>
      </Router>
   </Provider>,
   document.getElementById('app')
)