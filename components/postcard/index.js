import React, { useState } from "react";
import { getJwt } from '/auth'

const PostCard = (props) => {
  const [showCaption, setShowCaption] = useState(false);
  const [liked, setLiked] = useState(false);
  console.log(props)

  const showTruncate = () => {
    if (showCaption) {
      return "";
    }
    const truncate = "truncate max-w-sm overflow-hidden ";
    return truncate;
  };

  const showLiked = () => {
    if (liked) {
      return { likeIcon: "/rose.svg", animation: "animate-pulse-red" };
    }
    const likedImage = { likeIcon: "/leaf.svg", animation: "" };
    return likedImage;
  };

  const likePost = async () => {
    setLiked(!liked)
    let result = await fetch("http://localhost:3001/likePost", {
      method: "post",
      body: JSON.stringify({ post: { id: props.id } }),
      headers: {
        Authorization: getJwt(),
        "Content-Type": "application/json"
      },
    }).then((response) => {
      console.log(response);
    });
  }


  return (
    <div className="flex flex-col justify-center items-center p-4 z-10">
      <div className="flex h-10 w-2/3 mb-2 justify-start items-center">
        <img
          className="h-10 w-10 border-2 rounded-full p-2 my-2 hover:cursor-pointer"
          src={`https://inner-circle-project.s3.us-west-2.amazonaws.com/${props.pfp}`}
        />

        <div className="mx-2 text-lg">{props.username}</div>
        <div className="ml-auto mx-2 text-lg">{props.date}</div>
      </div>
      <div className="bg-red-400 w-2/3 border-4 border-lime-500 ">
        <img
          className="h-full w-full  relative"
          src={`https://inner-circle-project.s3.us-west-2.amazonaws.com/${props.photo}`}
          id={props.index}
        />
      </div>
      <div className="flex w-2/3 justify-between p-2">
        <div
          onClick={() => setShowCaption(!showCaption)}
          className={`mb-2 w-3/4 overflow-auto cursor-pointer ${showTruncate()}`}
        >
          <div className="text-lg text-lime-600">{props.likes.length} likes</div>
          <span className="sm:text-md md:text-lg lg:text-xl">
            {props.caption}
          </span>
        </div>
        <div className="flex">
          <img
            onClick={() => likePost()}
            className={`h-6 w-6 mx-2 hover:cursor-pointer rounded-full ${showLiked().animation
              }`}
            src={showLiked().likeIcon}
          />
          <img className="h-6 w-6 hover:cursor-pointer" src="/comment.svg" />
        </div>
      </div>
    </div>
  );
};

export default PostCard;
