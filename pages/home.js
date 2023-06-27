'use client'
import './globals.css'
import React, { useEffect, useState } from 'react'
import Navbar from '@/components/navbar'
import Link from 'next/link'
import Image from 'next/image'

const Home = () => {

    const [feed, setFeed] = useState([])
    console.log(feed)

    const getFeed = async () => {
        let result = await fetch(
            'http://localhost:3001/home', {
            method: "get",
        }
        )
        result = await result.json();
        const keyResults = result.keys
        return keyResults
    }

    useEffect(() => {
        const grabKeys = async () => {
            const getKeys = await getFeed()
            setFeed(getKeys)
        }
       grabKeys() 
    }, [])


    return (

        <div>

            {/* Top Navbar  */}

            <nav className='flex bg-black opacity-90 justify-between items-center px-4 h-16'>

                <h1 className='text-slate-100 text-xl'>InnerCircle</h1>

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
            {

                feed.map((photo, index) => (
                    <img src={`https://inner-circle-project.s3.us-west-2.amazonaws.com/${photo}`} id={index} />
                ))
            }
            <Navbar />
        </div>

    )

}

export default Home
