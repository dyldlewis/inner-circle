import React from "react";

const Gallery = (props) => {
  return (
    <div className="flex">
      <div className="flex items-center justify-evenly ">
        <img
          className="h-156 w-72"
          src={`https://inner-circle-project.s3.us-west-2.amazonaws.com/${props.photo.imageKey}`}
          id={props.index}
        />
      </div>
    </div>
  );
};

export default Gallery;
