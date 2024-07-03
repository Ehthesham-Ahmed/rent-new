import React from 'react'
import { Avatar, Button, Dropdown, Navbar, TextInput } from 'flowbite-react'
import { Link, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { signoutSuccess } from '../redux/user/userSlice';
//import { AiOutlineSearch } from 'react-icons/ai';


export default function Header() {
    const path = useLocation().pathname;
    const { currentUser } = useSelector(state => state.user);
    const dispatch = useDispatch();
    const handleSignout = async () => {
        try {
            const res = await fetch('/api/user/signout', {
                method: 'POST',
            });
            const data = await res.json();
            if (!res.ok) {
                console.log(data.message);
            } else {
                dispatch(signoutSuccess());
            }
        } catch (error) {
            console.log(error.message);
        }
    };
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
            {
                currentUser ? (
                    <div className='ml-auto'>
                        <Dropdown
                            arrowIcon={false}
                            inline
                            label={
                                <Avatar alt='user'
                                    img={currentUser.profilePicture}
                                    rounded />
                            }
                        >
                            <Dropdown.Header>
                                <span className='block text-sm'>@{currentUser.username}</span>
                                <span className='block text-sm font-medium truncate'>
                                    {currentUser.email}
                                </span>
                            </Dropdown.Header>
                            <Link to={'/dashboard?tab=profile'}>
                                <Dropdown.Item>Profile</Dropdown.Item>
                            </Link>
                            <Dropdown.Divider />
                            <Dropdown.Item
                                onClick={handleSignout}
                            >
                                Sign out
                            </Dropdown.Item>
                        </Dropdown>
                    </div>
                ) : (

                    <div className='relative flex items-center w-full max-w-xs gap-2 md:order-2 ml-auto'>
                        <Link to='sign-in'>

                            <Button className='w-20 text-black bg-blue-500 p-1 m-2'>
                                <h1 className='p-1 mx-2 text-nowrap font-semibold'>
                                    Sign In
                                </h1>

                            </Button>
                        </Link>
                    </div>
                )
            }
        </Navbar>
    )
}
