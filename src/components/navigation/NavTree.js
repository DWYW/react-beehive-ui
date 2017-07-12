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

   componentWillReceiveProps() {
      this._hashPath = location.hash.substring(1);
   }

   _init() {
      this._hashPath = location.hash.substring(1);
      let data = this._initData(this.props.data);
      data = this._initNodeAttribute(data, "isOpen", true);
      this.setState({
         data: data
      })
   }

   _initNodeAttribute(nodes, attribute, value) {
      let posArr = this._nodeSelectedPos.split("-");
      posArr = posArr.slice(1, posArr.length - 1);

      if(posArr.length == 0) {
         this._nodeOpend = "0"
         return nodes;
      }

      let treeNode = nodes;
      posArr.forEach((item) => {
         if(treeNode[parseInt(item)].children && treeNode[parseInt(item)].children.length > 0) {
            treeNode[parseInt(item)][attribute] = value;
            treeNode = treeNode[parseInt(item)].children;
         }
      })
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
         }

         if(node.children && node.children instanceof Array && node.children.length > 0) {
            node.children = this._initData(node.children, node._pos);
         }
      })

      return nodes
   }

   _setNodeSelect(pos, attr) {
      const data = this.state.data;
      const layer = this._getLayerPath(pos);

      if(pos.split("-")[1] !== this._nodeSelectedPos.split("-")[1] && attr == 'isOpen') {
         const key = this._nodeSelectedPos.split("-")[1];
         data[key][attr] = false;
      }

      if(layer.layerPaths.length == 0) {
         data[layer.key][attr] = !data[layer.key][attr];
      }
      else {
         let children = data;

         layer.layerPaths.map((path) => {
            children = children[parseInt(path)].children;
         })

         children[layer.key][attr] = !children[layer.key][attr];
      }

      return data
   }

   _getLayerPath(pos){
      const posArr = pos.split("-");
      let layerPaths = posArr.slice(1, posArr.length - 1);
      let key = posArr.slice(-1);
      return {
         layerPaths,
         key
      }
   }

   _getKeyValue(pos, attr) {
      const data = this.state.data;
      const layer = this._getLayerPath(pos);

      if(layer.layerPaths.length === 0) {
         return data[layer.key][attr];
      }
      else {
         let children = data;

         layer.layerPaths.map((path) => {
            children = children[parseInt(path)].children;
         })

         return children[layer.key][attr];
      }
   }

   _handleClick(node) {
      let data = this.state.data;

      if(node.children && node.children.length > 0) {
         data = this._setNodeSelect(node._pos, IS_OPEN);
      }

      if(this._nodeSelectedPos) {
         if(this._nodeSelectedPos !== node._pos) {

            if(this._getKeyValue(this._nodeSelectedPos, IS_SELECTED)) {
               data = this._setNodeSelect(this._nodeSelectedPos, IS_SELECTED);
            }

            data = this._setNodeSelect(node._pos, IS_SELECTED);
            this._nodeSelectedPos = node._pos;

            // if(!node.children || node.children.length == 0){
            //   //callback
            // }
         }
      }
      else {
         data = this._setNodeSelect(node._pos, IS_SELECTED);
         this._nodeSelectedPos = node._pos;

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
      className = className ? `nav-tree ${className}` : 'nav-tree';

      const createTreeNode = (treeNodes, spacing) => {
         spacing == undefined ? spacing = 16 : spacing += 16;
         return (
            treeNodes.map((item, key) => {
               const iconClassName = `iconfont ${item.iconClassName}`;
               const itemStyle = {
                  height: item.isOpen == false ? "0px" : `${42 * item.children.length}px`
               };

               return (
                  <li key={`${item.label}-${key}`} className="nav-tree-container">
                     {item.to && item.to.pathname !== this._hashPath ?
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
                                    style={{position: 'absolute', right: '0px', fontSize: '14px'}}></i>
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