import PropTypes from 'prop-types';
import React from 'react';
import {Link} from 'react-router-dom'

class NavTree extends React.Component {
   constructor(props) {
      super(props);
      this.nodeSelected = null;
      this._init = this._init.bind(this);
      this._setNodeSelect = this._setNodeSelect.bind(this);
      this._handleClick = this._handleClick.bind(this);
      this.state = {
         data: null
      }
   }

   componentWillMount() {
      this._init();
   }

   _init() {
      const data = this._initData(this.props.data);
      this.setState({
         data: data
      })
   }

   _initData(data) {
      data[0]['isSelected'] = true;
      this.nodeSelected = {
         layer: "",
         key: 0
      };
      this._route = {
         layer: "",
         key: 0
      }

      return data;
   }

   _setNodeSelect(layerPath, key, attr) {
      const data = this.state.data;

      if(layerPath == 'root') {
         data[key][attr] = !data[key][attr];
      }
      else {
         let children = data;
         layerPath.map((path) => {
            children = children[parseInt(path)].children;
         })
         children[key][attr] = !children[key][attr];
      }

      return data
   }

   _getLayerPath(layer){
      if(layer.toString() !== ""){
         return layer.toString().split("-");
      }
      else {
         return "root"
      }
   }

   _getKeyValue(layerPath, key, attr) {
      const data = this.state.data;

      if(layerPath == 'root') {
         return data[key][attr];
      }
      else {
         let children = data;
         layerPath.map((path) => {
            children = children[parseInt(path)].children;
         })
         return children[key][attr];
      }
   }

   _handleClick(layer, key, node) {
      let data = this.state.data;
      const layerPath = this._getLayerPath(layer);

      if(node.children && node.children.length > 0) {
         if(this.nodeOpen && (this.nodeOpen.layer != layer || this.nodeOpen.key != key)){
            if(this._getKeyValue(this._getLayerPath(this.nodeOpen.layer), this.nodeOpen.key, IS_OPEN)){
               data = this._setNodeSelect(this._getLayerPath(this.nodeOpen.layer), this.nodeOpen.key, IS_OPEN);
            }
         }

         data = this._setNodeSelect(layerPath, key, IS_OPEN);
         this.nodeOpen = {
            layer: layer,
            key: key
         }
      }

      if(this.nodeSelected) {
         if(this.nodeSelected.layer != layer || this.nodeSelected.key != key) {
            if(this._getKeyValue(this._getLayerPath(this.nodeSelected.layer), this.nodeSelected.key, IS_SELECTED)) {
               data = this._setNodeSelect(this._getLayerPath(this.nodeSelected.layer), this.nodeSelected.key, IS_SELECTED);
            }
            data = this._setNodeSelect(layerPath, key, IS_SELECTED);
            this.nodeSelected = {
               layer: layer,
               key: key
            };
            if(node.children && node.children.length == 0){
               this._route = {
                  layer: layer,
                  key: key
               }
            }

            // if(!node.children || node.children.length == 0){
            //   //callback
            // }
         }
      }
      else {
         data = this._setNodeSelect(layerPath, key, IS_SELECTED);
         this.nodeSelected = {
            layer: layer,
            key: key
         };
         // if(!node.children || node.children.length == 0){
         //    //callback
         // }
      }

      this.setState({
         data: data
      })
   }

   render() {
      let {data, className, spacing} = this.props;
      data = this.state.data;
      const layer = "";
      className = className ? `nav-tree ${className}` : 'nav-tree';

      const createTreeNode = (treeNodes, spacing, layer) => {
         spacing == undefined ? spacing = 16 : spacing += 16;
         return (
            treeNodes.map((item, key) => {
               const iconClassName = `iconfont ${item.iconClassName}`;
               const itemLayer = layer == "" ? `${key}` : `${layer}-${key}`;
               const itemStyle = {
                  height: item.isOpen == false ? "0px" : `${42 * item.children.length}px`
               };
               return (
                  <li key={item.label} className="nav-tree-container">
                     {!item.isSelected && (this._route.layer != layer || this._route.key != key) && item.children.length == 0 ?
                        (
                           <Link className="nav-tree-container-label"
                              style={{paddingLeft: `${spacing}px`}} data-selected={item.isSelected}
                              to={item.to}
                              onClick={() => this._handleClick(layer, key, item)}>
                              {item.iconClassName &&
                                 <i className={iconClassName}></i>
                              }
                              <span>{item.label}</span>
                           </Link>
                        ) : (
                           <div className="nav-tree-container-label" style={{paddingLeft: `${spacing}px`}} data-selected={item.isSelected}
                              onClick={() => this._handleClick(layer, key, item)}
                           >
                              {item.iconClassName &&
                                 <i className={iconClassName}></i>
                              }
                              <span>{item.label}</span>
                              {item.children.length > 0 &&
                                 <i className={item.isOpen ? 'iconfont icon-down' : 'iconfont icon-right'}
                                    style={{float: 'right',fontSize: '14px'}}></i>
                              }
                           </div>
                        )
                     }

                     <div className="nav-tree-children-container">
                        {item.children && (item.children instanceof Array) && item.children.length > 0 &&
                           <ul className={className} style={itemStyle}>
                              {createTreeNode(item.children, spacing, itemLayer)}
                           </ul>
                        }
                     </div>
                  </li>
               )
            })
         )
      }

      return (
         <ul className={className}>
            {createTreeNode(data, spacing, layer)}
         </ul>
      )

   }
}

NavTree.propTypes = {
   data: PropTypes.array,
   spacing: PropTypes.string,
   className: PropTypes.string
}

const IS_SELECTED = 'isSelected';
const IS_OPEN = 'isOpen';

export default NavTree