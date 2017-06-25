import {BHTree} from 'beehive'
import React from 'react';

class NavTree extends BHTree {
   constructor(props){
      super(props);
   }

   render() {
      let {data, className, spacing} = this.props;
      data = this.state.data;
      spacing = spacing == undefined ? "1rem" : spacing;
      const layer = "";
      className = className ? `nav-tree ${className}` : 'nav-tree';

      const createTreeNode = (treeNodes, spacing, layer) => {
         return (
            treeNodes.map((item, key) => {
               const iconClassName = item.isOpen == true ?
                  `iconfont ${item.iconClassName[0]}` : `iconfont ${item.iconClassName[0]}`;
               const itemLayer = layer == "" ? `${key}` : `${layer}-${key}`;
               const itemStyle = {
                  paddingLeft: spacing,
                  marginTop: item.isOpen == false ? "0" : `-${36*item.children.length}px`
               };

               return (
                  <li key={item.idx} className="nav-tree-container">
                     <div className="nav-tree-container-label" data-selected={item.isSelected}
                        onClick={(e) => this._handleClick(e, layer, key, item)}
                     >
                        {item.iconClassName &&
                           <i className={iconClassName}></i>
                        }
                        <span>{item.label}</span>
                     </div>
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

export default NavTree