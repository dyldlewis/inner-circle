import Link from "next/link";
import "../../app/globals.css";
import Image from "next/image";
import React, { useState } from "react";

const Navbar = () => {
  async function importData() {
    let input = document.createElement("input");
    input.type = "file";
    input.onchange = async (_) => {
      var files = Array.from(input.files);
      var file = files[0];
      const formData = new FormData();
      formData.append("image", file);
      const jwt = localStorage.getItem("jwt");
      const formattedJwt = `Bearer ${jwt}`;

      let result = await fetch("http://localhost:3001/upload", {
        method: "post",
        body: formData,
        headers: {
          Authorization: formattedJwt,
        },
      }).then((response) => {
        console.log(response);
      });
    };
    input.click();
  }
  return (
    <div className="flex justify-center sticky bottom-0 w-full bg-black relative z-10">
      <ul className="mt-3 flex justify-evenly w-full">
        <Link href={"/home"}>
          <li className="flex w-full cursor-pointer items-center justify-center p-4 hover:opacity-50">
            <Image
              height={25}
              width={25}
              src={"/home.svg"}
              alt="home icon"
              className="h-10 w-10"
            />
          </li>
        </Link>

        <li
          onClick={importData}
          className="flex w-full cursor-pointer items-center justify-center p-4 hover:opacity-50"
        >
          <div>
            <Image
              height={25}
              width={25}
              src={"/plus.svg"}
              alt="plus icon"
              className="h-10 w-10"
            />
          </div>
        </li>

        <Link href={"/profile"}>
          <li className="flex w-full cursor-pointer items-center justify-center p-4 hover:opacity-50">
            <Image
              height={25}
              width={25}
              src={"/profile.svg"}
              alt="profile Icon"
              className="h-10 w-10"
            />
          </li>
        </Link>
      </ul>
    </div>
  );
};

export default Navbar;
