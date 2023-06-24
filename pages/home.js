'use client'
import './globals.css'
import React from 'react'
import Navbar from '@/components/navbar'
import Link from 'next/link'
import Image from 'next/image'

const Home = () => {


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

            <Navbar />
        </div>

    )

}

export default Home