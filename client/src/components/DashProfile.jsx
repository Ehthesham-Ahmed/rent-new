import { TextInput } from 'flowbite-react';
import React from 'react'
import { useSelector } from 'react-redux';

export default function DashProfile() {
    const { currentUser, error, loading } = useSelector((state) => state.user);
    return (
        <div className='max-w-lg mx-auto p-3 w-full'>
            <h1 className='my-7 text-center font-semibold text-3xl'>Profile</h1>
            <form className='flex flex-col gap-4'>
                <div className='w-36 h-36 self-center shadow-xl overflow-hidden rounded-full'>
                    <img src={currentUser.profilePicture}
                        alt='user'
                        className='rounded-full w-full h-full object-cover border-8 border-[#1fe7cd]' />
                </div>
                <div className='text-center p-4 m-4'>
                    <p className='font-bold p-2'>Username : <span className='font-semibold text-gray-700'>{currentUser.username}</span></p>
                    <p className='font-bold p-2'>Email : <span className='font-semibold text-gray-700'>{currentUser.email}</span></p>
                </div>
            </form>
            <div className='text-red-500 flex justify-between mt-5'>
                <span className='cursor-pointer'>Delete Account</span>
                <span className='cursor-pointer'>Sign Out</span>
            </div>
        </div>
    )
}
