"use client";
import React, { useState } from "react";
import { logout } from "../../auth"
import Notifications from "../notifications"
import Search from "../search"
const TopNav = (props) => {
  const [isToggled, setIsToggled] = useState(false);

  return (
    <nav className="flex justify-between items-center px-4 h-16 z-20 relative bg-black">
      <h1 className="text-slate-100 text-xl">{props.navName}</h1>

      <div className="flex w-full justify-end items-center stroke-red stroke-2">

        <Search />
        <Notifications />
        <img
          src={"/settings.svg"}
          height={25}
          width={25}
          className="h-10 w-10 hover:opacity-50 hover:cursor-pointer"
          alt="settings icon"
          onClick={() => setIsToggled(!isToggled)}
        />
      </div>

      {isToggled && (
        <div className="absolute top-14 right-2 w-36 bg-black border-2 border-lime-600 rounded-full text-center">

          <a
            onClick={() => logout()}
            className="cursor-pointer block text-slate-100 py-2 px-2  hover:bg-lime-700 rounded-full capitalize"
          >
            Logout
          </a>

        </div>
      )}
    </nav>
  );
};

export default TopNav;
