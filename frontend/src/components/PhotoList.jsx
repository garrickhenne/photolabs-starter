import React from "react";

import "../styles/PhotoList.scss";
import PhotoListItem from "./PhotoListItem";

const PhotoList = (props) => {
  // console.log(props.data)
  const photoItems = props.data.map(photoData => {
    return <PhotoListItem key={ photoData.id } data={ photoData } handleLikeId={ props.handleLikeId } toggleShowDetailsModal={ props.toggleShowDetailsModal } />
  });

  return (
    <ul className="photo-list">
      { photoItems }
    </ul>
  );
};

export default PhotoList;
