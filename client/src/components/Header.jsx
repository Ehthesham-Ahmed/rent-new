import React from 'react'
import { Button, Navbar, TextInput } from 'flowbite-react'
import { Link, useLocation } from 'react-router-dom'
//import { AiOutlineSearch } from 'react-icons/ai';


export default function Header() {
    const path = useLocation().pathname;
    return (
        <Navbar className='border-b-2'>
            <Link to='/'
                className='self-center whitespace-nowrap text-sm sm:text-xl font-semibold'>
                <span className='px-2 py-1 bg-gradient-to-r from-red-700 via-lime-600 to-emerald-600 rounded-lg text-white'>Smart</span>
                CarMatch
            </Link>
            {/* <form>
                 <TextInput
                    type='text'
                    placeholder='Search...'
                    rightIcon={AiOutlineSearch}
                    className='hidden lg:inline'
                /> 
            </form> */}
            <div className='relative flex items-center w-full max-w-xs gap-2 md:order-2 ml-auto'>
                <Link to='sign-in'>

                    <Button className='w-20 text-black bg-blue-500 p-1 m-2'>
                        <h1 className='p-1 mx-2 text-nowrap font-semibold'>
                            Sign In
                        </h1>

                    </Button>
                </Link>
            </div>
        </Navbar>
    )
}
