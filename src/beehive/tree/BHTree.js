import React from 'react';
import PropTypes from 'prop-types'

class BHTree extends React.Component {
   constructor(props) {
      super(props);
      this.nodeSelected = null;
      this.multiSelected = [];
      this.multiSelectedLayer = [];
      this._init = this._init.bind(this);
      this._setNodeSelect = this._setNodeSelect.bind(this);
      this._handleClick = this._handleClick.bind(this);
      this.state = {
         data: null,
         // nodeSelected: null
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
      return data;
   }

   _parentCallback(node){
      if(this.props.onClick) {
         this.props.onClick(node)
      }
   }

   _setNodeSelect(layerPath, key, attr) {
      if(attr == IS_SELECTED && !this.props.multiselect) {
         this.nodeSelected = {
            layerPath: layerPath,
            key: key
         };
      }

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

   _handleClick(e, layer, key, node) {
      let data = this.state.data;
      const layerPath = this._getLayerPath(layer);

      if(node.children && node.children.length > 0) {
         data = this._setNodeSelect(layerPath, key, IS_OPEN);
      }
      else {
         if(!this.props.multiselect) {
            if(this.nodeSelected) {
               data = this._setNodeSelect(this.nodeSelected.layerPath, this.nodeSelected.key, IS_SELECTED);
            }
            data = this._setNodeSelect(layerPath, key, IS_SELECTED);
            this._parentCallback(node)
         }
         else {
            if(this.multiSelectedLayer.indexOf(`${layer}-${key}`) === -1){
               this.multiSelectedLayer.push(`${layer}-${key}`);
               this.multiSelected.push(node);
            }
            else{
               this.multiSelectedLayer.splice(this.multiSelectedLayer.indexOf(`${layer}-${key}`),1);
               this.multiSelected.splice(this.multiSelectedLayer.indexOf(`${layer}-${key}`) + 1,1);
            }
            data = this._setNodeSelect(layerPath, key, IS_SELECTED);
         }
      }

      this.setState({
         data: data
      })
   }

   render() {
      let {data, className, spacing} = this.props;
      data = this.state.data;
      spacing = spacing == undefined ? "1rem" : spacing;
      const layer = "";
      className = className ? `beehive-tree ${className}` : 'beehive-tree';

      const createTreeNode = (treeNodes, spacing, layer) => {
         return (
            treeNodes.map((item, key) => {
               const iconClassName = item.isOpen == true ?
                  `iconfont ${item.iconClassName[1]}` : `iconfont ${item.iconClassName[0]}`;
               const itemLayer = layer == "" ? `${key}` : `${layer}-${key}`;
               const itemStyle = {
                  paddingLeft: spacing,
                  height: item.isOpen == false ? "0px" : ""
               };

               return (
                  <li key={item.idx} className="beehive-tree-container">
                     <div className="beehive-tree-container-label" data-selected={item.isSelected}
                        onClick={(e) => this._handleClick(e, layer, key, item)}
                     >
                        {item.iconClassName &&
                           <i className={iconClassName}></i>
                        }
                        <span>{item.label}</span>
                     </div>
                     {item.children && (item.children instanceof Array) && item.children.length > 0 &&
                        <ul className={className} style={itemStyle}>
                           {createTreeNode(item.children, spacing, itemLayer)}
                        </ul>
                     }
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

BHTree.propTypes = {
   data: PropTypes.array,
   multiselect: PropTypes.bool
}

BHTree.defaultProps = {
   multiselect: false
}

const IS_SELECTED = 'isSelected';
const IS_OPEN = 'isOpen';

export default BHTree

