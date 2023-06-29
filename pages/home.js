"use client";
import "./globals.css";
import React, { useEffect, useState } from "react";
import Navbar from "@/components/navbar";
import Link from "next/link";
import Image from "next/image";
import PostCard from "@/components/postcard";

const Home = () => {
  const [feed, setFeed] = useState([]);

  const getFeed = async () => {
    let result = await fetch("http://localhost:3001/home", {
      method: "get",
    });
    result = await result.json();
    console.log(result);
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
    <div className="bg-black text-slate-100">
      {/* Top Navbar  */}

      <nav className="flex bg-black opacity-90 justify-between items-center px-4 h-16 z-10 relative">
        <h1 className="text-slate-100 text-xl">InnerCircle</h1>

        <div className="flex w-full justify-end items-center stroke-red stroke-2">
          <Link href={"/"}>
            <Image
              src={"/bell.svg"}
              height={25}
              width={25}
              className="h-10 w-10 mx-4 hover:opacity-50"
              alt="notification icon"
              priority
            />
          </Link>
          <Link href={"/"} passHref>
            <Image
              src={"/settings.svg"}
              height={25}
              width={25}
              className="h-10 w-10 hover:opacity-50"
              alt="settings icon"
            />
          </Link>
        </div>
      </nav>
      <div className="relative z-10">
        {feed.map((photo, index) => (
          <PostCard
            photo={photo.imageKey}
            username={photo.userName}
            date={photo.postedAt}
            key={index}  
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

export default Home;
