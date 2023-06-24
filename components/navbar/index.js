import Link from 'next/link'
import '../../app/globals.css'
import Image from 'next/image'


const Navbar = () => {


    return (



        <div className='fixed bottom-0 w-full bg-black'>

            <ul className='mt-3 flex justify-evenly'>

                <li className='relative flex w-full cursor-pointer items-center justify-center p-4 hover:opacity-50'>
                    <Link href={'/home'}>
                        <Image height={25} width={25} src={'/home.svg'} alt='home icon' className='h-10 w-10' />
                    </Link>
                </li>

                <li className='relative flex w-full cursor-pointer items-center justify-center p-4 hover:opacity-50'>

                    <Link href={'/profile'}>
                        <Image height={25} width={25} src={'/profile.svg'} alt='profile Icon' className='h-10 w-10' />
                    </Link>
                </li>

            </ul>
        </div>


    )

}



export default Navbar;