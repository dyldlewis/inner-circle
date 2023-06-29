import React from "react";

const Gallery = (props) => {

  const imageStyle = () => {
    const gridView =
      "w-24 h-24 sm:h-72 sm:w-72 border-2 border-lime-500 object-cover object-center";
    const singleView =
      "w-128 border-4 border-lime-500 object-cover object-center";
    if (props.view == "grid") {
      return gridView
    }
    if (props.view == "single") {
      return singleView
    }
  }
  return (
    <div className="flex m-2 justify-center">
      <img
        className={imageStyle()}
        src={`https://inner-circle-project.s3.us-west-2.amazonaws.com/${props.photo.imageKey}`}
        id={props.index}
      />
    </div>
  );
};

export default Gallery;
