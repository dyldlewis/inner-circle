import React from "react";

const PostCard = (props) => {
  return (
    <div className="flex flex-col justify-center items-center p-4 z-10">
      <div className="flex w-72 justify-start items-center">
        <img
          className="h-10 w-10 border-2 rounded-full p-2 my-2 hover:cursor-pointer"
          src="/profile.svg"
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
      <div className="flex w-72 h-10 justify-between p-2">
        <div>
          <span className="text-md">Caption caption</span>
        </div>
        <div className="flex">
          <img className="h-8 w-8 mx-2 hover:cursor-pointer" src="/leaf.svg" />
          <img className="h-8 w-8 hover:cursor-pointer" src="/comment.svg" />
        </div>
      </div>
    </div>
  );
};

export default PostCard;
