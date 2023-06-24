'use client'
import './globals.css'
import Link from "next/link";
import React, { useState } from 'react';



export default function SignUp() {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    console.log(email, password)
    let result = await fetch(
      'http://localhost:3001/sign-up', {
      method: "post",
      body: JSON.stringify({ email, password }),
      headers: {
        'Content-Type': 'application/json'
      }
    }
    )
    result = await result.json();
    console.warn(result)
    if (result) {
      alert("Data saved successfully")
      setEmail("")
      setPassword("")

      window.location.href = '/login'
    }


  }





  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen overflow-hidden">
      <div className="w-full p-6 bg-white rounded-md shadow-md lg:max-w-xl">
        <h1 className="text-3xl font-bold text-center text-lime-600">InnerCircle</h1>
        <img className="w-24 h-24 mx-auto mt-4" src="../logo.png" />
        <form className="mt-6">
          <div className="mb-4">
            <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Sign Up</h2>
            <label
              htmlFor="email"
              className="block text-sm font-semibold text-gray-800"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              className="required block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-lime-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              required
            />
          </div>
          <div className="mb-2">
            <label
              htmlFor="password"
              className="block text-sm font-semibold text-gray-800"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-lime-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              required
            />
          </div>
          <div className="mt-2">
            <button className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-lime-600 rounded-md hover:bg-lime-500 focus:outline-none focus:bg-lime-600"
              onClick={handleOnSubmit}
            >
              Create Account
            </button>
          </div>
        </form>

        <p className="mt-4 text-sm text-center text-gray-700">
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-medium text-yellow-800 hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
