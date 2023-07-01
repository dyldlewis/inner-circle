"use client";
import React, { useState, useEffect } from "react";
import Navbar from "@/components/navbar";
import Link from "next/link";
import Image from "next/image";
import Gallery from "@/components/gallery";
import TopNav from "@/components/topnav";
import withAuth from "../auth/withAuth.js"
import { getJwt } from "../auth"

const Profile = () => {
  const [profile, setProfile] = useState({});
  const [view, setView] = useState("grid");
  const [isEditing, setIsEditing] = useState(false);
  const [toggleLogout, setToggleLogout] = useState(false);

  const postView = () => {
    const galleryView = "flex flex-row flex-wrap justify-center min-h-screen";
    const singleView = "w-full";
    if (view == "grid") {
      return galleryView;
    }
    if (view == "single") {
      return singleView;
    }
  };

  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  const handleBioChange = (event) => {
    setProfile({ ...profile, bio: event.target.value });
  };

  useEffect(() => {
    async function getProfile() {
      const jwt = getJwt();
      let result = await fetch("http://localhost:3001/profile", {
        method: "get",
        headers: {
          Authorization: jwt,
        },
      });
      result = await result.json();
      console.log(result);
      if (result) {
        setProfile(result);
      }
    }
    getProfile();
  }, []);

  const setBio = async () => {
    const jwt = getJwt()

    try {
      const response = await fetch("http://localhost:3001/bio", {
        method: "POST",
        headers: {
          Authorization: jwt,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ bio: profile.bio }),
      });

      if (response.ok) {
        setIsEditing(false);
      } else {
        throw new Error("Profile update failed");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  async function setProfilePicture() {
    let input = document.createElement("input");
    input.type = "file";
    input.onchange = async (_) => {
      var files = Array.from(input.files);
      var file = files[0];
      const formData = new FormData();
      formData.append("image", file);
      const jwt = getJwt()

      let result = await fetch("http://localhost:3001/pfp", {
        method: "post",
        body: formData,
        headers: {
          Authorization: jwt,
        },
      }).then((response) => {
        console.log(response);
      });
    };
    input.click();
  }

  return (
    <div className="bg-black opacity-90 min-h-screen">
      <TopNav navName={profile.username} />

      {/* User Profile */}

      <div className="flex justify-start lg:text-2xl px-4 py-3 text-xl">
        <img
          className="border-2 rounded-full h-20 w-20 cursor-pointer"
          src={`https://inner-circle-project.s3.us-west-2.amazonaws.com/${profile.pfp}`}
        />
        <img
          src="/profile-plus.svg"
          onClick={setProfilePicture}
          className="hover:cursor-pointer h-4 w-4 absolute left-20 top-36"
        />
        <div className="mt-3 flex items-center space-x-4  px-6">
          <div className="cursor-pointer hover:underline flex items-center flex-col mx-6 text-slate-100">
            <span className="font-bold text-lime-600">
              {profile.userPosts?.length}{" "}
            </span>
            <span>Posts</span>
          </div>
          <div className="cursor-pointer hover:underline flex flex-col items-center text-slate-100">
            <span className="font-bold text-lime-600">31.4 M </span>
            <span>Leaves</span>
          </div>
        </div>
      </div>

      {isEditing ? (
        <div className="flex justify-start ml-4">
          {" "}
          <textarea
            className="border-2 border-lime-500 p-4 resize-none bg-black w-full opacity-90 text-slate-100"
            value={profile.bio}
            onChange={handleBioChange}
          />{" "}
          <img
            onClick={isEditing ? setBio : toggleEdit}
            src="/edit.svg"
            className="h-6 w-6 mx-4 inline hover:cursor-pointer"
          />{" "}
        </div>
      ) : (
        <div className="px-4 mt-4  text-slate-100 lg:text-lg">
          <span>
            {profile.bio}
            <img
              onClick={isEditing ? setBio : toggleEdit}
              src="/edit.svg"
              className="hover:cursor-pointer h-4 w-4 mx-4 inline"
            />
          </span>
        </div>
      )}

      {/* Photo View Options */}

      <ul className="mt-3 flex justify-evenly">
        <li
          onClick={() => {
            setView("grid");
          }}
          className="relative flex w-full cursor-pointer items-center justify-center p-4 transition duration-150 ease-in-out hover:opacity-50"
        >
          <Image
            height={25}
            width={25}
            src={"/grid.svg"}
            className="h-10 w-10"
            alt="grid icon"
          />
          {/* <div className="absolute bottom-0 w-14 border-b-[3px] border-lime-500"></div> */}
        </li>
        <li
          onClick={() => {
            setView("single");
          }}
          className="flex w-full cursor-pointer items-center justify-center p-4 transition duration-150 ease-in-out hover:opacity-50 "
        >
          <Image
            height={25}
            width={25}
            src={"/box.svg"}
            className="h-10 w-10"
            alt="grid icon"
          />
        </li>
        <li className="flex w-full cursor-pointer items-center justify-center p-4 transition duration-150 ease-in-out hover:opacity-50">
          <Image
            src={"/leaf.svg"}
            height={25}
            width={25}
            className="h-10 w-10 mx-4"
            alt="notification icon"
            priority
          />
        </li>
      </ul>

      {/* User Posts */}
      <div className={postView()}>
        {profile.userPosts?.map((photo, index) => (
          <Gallery
            photo={photo}
            date={photo.postedAt}
            key={index}
            className="opacity-100"
            view={view}
          />
        ))}
      </div>
      <Navbar />
    </div>
  );
};

export default withAuth(Profile);
