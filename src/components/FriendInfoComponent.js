import React from 'react';
import PropTypes from 'prop-types';

class FriendInfoComponent extends React.Component {
   constructor(props) {
      super(props);
   }

   render() {
      const {headImgUrl, name} = this.props;

      return (
         <div className="friend-info-component">
            <div className="photo-img">
               {headImgUrl &&
                  <img src={`${headImgUrl}?x-oss-process=image/resize,w_128`}/>
               }
            </div>
            <div className="photo-info-name text-center">{name}</div>
         </div>
      )
   }

}

FriendInfoComponent.propTypes = {
   headImgUrl: PropTypes.string,
   name: PropTypes.string
}

export default FriendInfoComponent;