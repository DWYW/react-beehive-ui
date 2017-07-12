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

      this._hashPath = location.hash.substring(1);
      let data = this._initData(this.props.data);
      data = this._initNodeAttribute(data, "isOpen", true);
      console.log(data)
      this.setState({
         data: data
      })

      // this.nodeSelected = {
      //    layer: "",
      //    key: 0
      // };
      // this._route = {
      //    layer: "",
      //    key: 0
      // }
   }

   _initNodeAttribute(nodes, attribute, value) {
      let posArr = this._nodeSelectedPos.split("-");
      posArr = posArr.slice(1, posArr.length - 1);

      if(posArr.length == 0) {
         this._nodeOpend = "0"
         return nodes;
      }

      let treeNode = nodes;
      posArr.forEach((item, key) => {
         // if(key == (posArr.length - 1)) {
         //    this._nodeOpened = treeNode[parseInt(item)]._pos;
         // }

         if(treeNode[parseInt(item)].children && treeNode[parseInt(item)].children.length > 0) {
            treeNode[parseInt(item)][attribute] = value;
            treeNode = treeNode[parseInt(item)].children;
         }
      })
      // console.log(this._nodeOpened);
      return nodes
   }

   _initData(nodes, pos = false) {
      if(nodes === null || nodes.length === 0) {
         return []
      }

      nodes.map((node, key) => {
         node._pos = pos ? `${pos}-${key}` : `0-${key}`;

         if(node.to && node.to.pathname == this._hashPath) {
            node.isSelected = true;
            this._nodeSelectedPos = node._pos;
            // this.nodeSelected = {
            //    layer: pos ? pos : '0',
            //    key: key
            // };
            // this._route = {
            //    layer: pos ? pos : '0',
            //    key: key
            // }
            console.log(node._pos);
         }

         if(node.children && node.children instanceof Array && node.children.length > 0) {
            node.children = this._initData(node.children, node._pos);
         }
      })

      return nodes
   }

   _setNodeSelect(pos, attr) {
      const data = this.state.data;
      const posArr = pos.split("-");
      let layerPath = posArr.slice(1, posArr.length-1);
      let key = posArr.slice(-1);

      if(layerPath.length == 0) {
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

   _getLayerPath(pos){
      // if(layer.toString() !== ""){
      //    return layer.toString().split("-");
      // }
      // else {
      //    return "root"
      // }
   }

   _getKeyValue(pos, attr) {
      console.log(pos, attr)
      // const data = this.state.data;

      // if(layerPath == 'root') {
      //    return data[key][attr];
      // }
      // else {
      //    let children = data;
      //    layerPath.map((path) => {
      //       children = children[parseInt(path)].children;
      //    })
      //    return children[key][attr];
      // }
   }

   _handleClick(node) {
      const poses = node._pos.split("-");
      let data = this.state.data;
      // const layerPath = this._getLayerPath(layer);
      // console.log(layerPath)

      if(node.children && node.children.length > 0) {
         // if(this.nodeOpen && (this.nodeOpen.layer != layer || this.nodeOpen.key != key)){
         //    if(this._getKeyValue(this._getLayerPath(this.nodeOpen.layer), this.nodeOpen.key, IS_OPEN)){
         //       data = this._setNodeSelect(this._getLayerPath(this.nodeOpen.layer), this.nodeOpen.key, IS_OPEN);
         //    }
         // }

         data = this._setNodeSelect(node._pos, IS_OPEN);
         // this.nodeOpen = {
         //    layer: layer,
         //    key: key
         // }
      }

      // if(this.nodeSelected) {
      //    if(this.nodeSelected.layer != layer || this.nodeSelected.key != key) {
      //       if(this._getKeyValue(this._getLayerPath(this.nodeSelected.layer), this.nodeSelected.key, IS_SELECTED)) {
      //          data = this._setNodeSelect(this._getLayerPath(this.nodeSelected.layer), this.nodeSelected.key, IS_SELECTED);
      //       }
      //       data = this._setNodeSelect(layerPath, key, IS_SELECTED);
      //       this.nodeSelected = {
      //          layer: layer,
      //          key: key
      //       };
      //       if(node.children && node.children.length == 0){
      //          this._route = {
      //             layer: layer,
      //             key: key
      //          }
      //       }

      //       // if(!node.children || node.children.length == 0){
      //       //   //callback
      //       // }
      //    }
      // }
      // else {
      //    data = this._setNodeSelect(layerPath, key, IS_SELECTED);
      //    this.nodeSelected = {
      //       layer: layer,
      //       key: key
      //    };
      //    // if(!node.children || node.children.length == 0){
      //    //    //callback
      //    // }
      // }

      this.setState({
         data: data
      })
   }

   render() {
      let {data, className, spacing} = this.props;
      data = this.state.data;
      // const layer = "";
      className = className ? `nav-tree ${className}` : 'nav-tree';

      const createTreeNode = (treeNodes, spacing) => {
         spacing == undefined ? spacing = 16 : spacing += 16;
         return (
            treeNodes.map((item, key) => {
               const iconClassName = `iconfont ${item.iconClassName}`;
               // const itemLayer = layer == "" ? `${key}` : `${layer}-${key}`;
               const itemStyle = {
                  height: item.isOpen == false ? "0px" : `${42 * item.children.length}px`
               };

               return (
                  <li key={item.label} className="nav-tree-container">
                     {item.to && item._pos !== this._nodeSelectedPos ?
                        (
                           <Link className="nav-tree-container-label"
                              style={{paddingLeft: `${spacing}px`}} data-selected={item.isSelected}
                              to={item.to}
                              onClick={() => this._handleClick(item)}>
                              {item.iconClassName &&
                                 <i className={iconClassName}></i>
                              }
                              <span>{item.label}</span>
                           </Link>
                        ) : (
                           <div className="nav-tree-container-label" style={{paddingLeft: `${spacing}px`}} data-selected={item.isSelected}
                              onClick={() => this._handleClick(item)}
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
                              {createTreeNode(item.children, spacing)}
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
            {createTreeNode(data, spacing)}
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