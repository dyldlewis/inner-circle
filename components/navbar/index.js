import Link from "next/link";
import "../../app/globals.css";
import Image from "next/image";
import React from "react";
import ImagePreview from "../imagePreview";

const Navbar = () => {
  return (
    <div className="flex justify-center sticky bottom-0 top-0 w-full bg-black z-10">
      <ul className="mt-3 flex justify-evenly w-full">
        <a href={"/home"}>
          <li className="flex w-full cursor-pointer items-center justify-center p-4 hover:opacity-50">
            <Image
              height={25}
              width={25}
              src={"/home.svg"}
              alt="home icon"
              className="h-10 w-10"
            />
          </li>
        </a>
        <a>
          <li className="flex w-full cursor-pointer items-center justify-center p-4">
            <ImagePreview />
          </li>
        </a>
        <a href={"/profile"}>
          <li className="flex w-full cursor-pointer items-center justify-center p-4 hover:opacity-50">
            <Image
              height={25}
              width={25}
              src={"/profile.svg"}
              alt="profile Icon"
              className="h-10 w-10"
            />
          </li>
        </a>
      </ul>
    </div>
  );
};

export default Navbar;
