"use client";
import "./globals.css";
import React, { useEffect, useState } from "react";
import Navbar from "@/components/navbar";
import PostCard from "@/components/postcard";
import TopNav from "@/components/topnav";
import withAuth from "../auth/withAuth.js";

const Home = () => {
  const [feed, setFeed] = useState([]);

  const getFeed = async () => {
    let result = await fetch("http://localhost:3001/home", {
      method: "get",
    });
    result = await result.json();
    const keyResults = result.photos;
    return keyResults;
  };

  useEffect(() => {
    const grabKeys = async () => {
      const getKeys = await getFeed();
      setFeed(getKeys);
    };
    grabKeys();
  }, []);

  return (
    <div className=" text-slate-100 bg-black opacity-90">
      <TopNav navName={"InnerCircle"} />

      <div className="relative z-10">
        {feed.map((photo, index) => (
          <PostCard
            photo={photo.imageKey}
            caption={photo.caption}
            username={photo.userName}
            date={photo.postedAt}
            key={index}
            pfp={photo.pfp}
            id={photo.id}
            likes={photo.likes}
            comments={photo.comments}
          />
        ))}
      </div>
      <img

        className="fixed top-0 right-0 opacity-70 h-80 w-80 z-0"
        src="/vine.png"
      />
      <img
        className="fixed bottom-10 left-0 opacity-70 h-80 w-80"
        src="/tree.png"
      />
      <Navbar />
    </div>
  );
};

export default withAuth(Home);
