'use client'
import React, { useState, useEffect } from "react"
import Navbar from "@/components/navbar"
import Link from "next/link"
import Image from "next/image"


const Profile = () => {


  const [user, setUser] = useState({})

  useEffect(() => {
    async function getProfile() {

      const jwt = localStorage.getItem('jwt');
      const formattedJwt = `Bearer ${jwt}`
      let result = await fetch(
        'http://localhost:3001/profile', {
        method: "get",
        headers: {
          'Authorization': formattedJwt,
        }
      }
      )
      result = await result.json();
      if (result) {
        setUser(result)
      }
    }
    getProfile()
  }, [])




  return (


    <div className='bg-black opacity-90'>

      <nav className='flex justify-between items-center px-4 h-16'>

        <h1 className='text-slate-100 text-xl'>{user.username}</h1>

        <div className='flex w-full justify-end items-center stroke-red stroke-2'>

          <Link href={'/'}>
            <Image
              src={'/bell.svg'}
              height={25}
              width={25}
              className='h-10 w-10 mx-4 hover:opacity-50'
              alt='notification icon'
              priority
            />
          </Link>
          <Link href={'/'}>
            <Image src={'/settings.svg'}
              height={25}
              width={25}
              className='h-10 w-10 hover:opacity-50'
              alt='settings icon'

            />
          </Link>
        </div>

      </nav>


      {/* User Profile */}


      <div className="flex justify-start lg:text-2xl px-4 py-3 text-xl">
        <Image height={25} width={25} className='border-2 rounded-full h-20 w-20 cursor-pointer' src={'/profile.svg'} alt='profile icon' />
        <div className="mt-3 flex items-center space-x-4  px-6">
          <div className="cursor-pointer hover:underline flex items-center flex-col mx-6 text-slate-100">
            <span className="font-bold text-lime-600">50 </span>
            <span>Posts</span>
          </div>
          <div className="cursor-pointer hover:underline flex flex-col items-center text-slate-100">
            <span className="font-bold text-lime-600">1207 </span>
            <span>Leaves</span>
          </div>
        </div>
      </div>

      <div className='px-4 mt-4 text-slate-100 lg:text-lg'>
        <span>Hey I like riding my skateboard n shit taking pictures of the sun and its reflections and light n shit. Worked at national geographic 5 years.</span>
      </div>

      {/* Photo View Options */}

      <ul className="mt-3 flex justify-evenly">
        <li className="relative flex w-full cursor-pointer items-center justify-center p-4 transition duration-150 ease-in-out hover:opacity-50">
          <Image height={25} width={25} src={'/grid.svg'} className='h-10 w-10' alt='grid icon' />
          {/* <div className="absolute bottom-0 w-14 border-b-[3px] border-lime-500"></div> */}
        </li>
        <li className="flex w-full cursor-pointer items-center justify-center p-4 transition duration-150 ease-in-out hover:opacity-50 ">
          <Image height={25} width={25} src={'/box.svg'} className='h-10 w-10' alt='grid icon' />

        </li>
        <li className="flex w-full cursor-pointer items-center justify-center p-4 transition duration-150 ease-in-out hover:opacity-50">

          <Image
            src={'/leaf.svg'}
            height={25}
            width={25}
            className='h-10 w-10 mx-4'
            alt='notification icon'
            priority
          />
        </li>
      </ul>

      {/* User Posts */}

      <div className='bg-gradient-to-b from-slate-100 to-slate-300 flex justify-between'>

        <div className='h-screen w-full bg-blue-300'></div>
        <div className='h-screen w-full bg-green-300'></div>
        <div className='h-screen w-full bg-red-300'></div>
      </div>

      <Navbar />
    </div>
  )
}

export default Profile