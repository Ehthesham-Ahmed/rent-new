import { Button, Label, TextInput } from 'flowbite-react';
import React from 'react'
import { Link, useNavigate } from 'react-router-dom';

export default function SignUp() {
    return (
        <div className='min-h-screen mt-20'>
            <div className='flex p-3 max-w-3xl mx-auto flex-col 
            md:flex-row md:items-center gap-5'>
                {/* left */}
                <div className='flex-1'>
                    <Link to='/'
                        className='font-bold text-4xl'>
                        <span className='px-2 py-1 bg-gradient-to-r from-red-700 via-lime-600 to-emerald-600 rounded-lg text-white'>Smart</span>
                        CarMatch
                    </Link>
                    <p className='text-sm mt-5'>
                        Our website is a one-stop platform for buying, selling, and renting cars with ease.
                        Whether you're looking for your next rental or trying to sell your current one, we've got you covered.
                    </p>
                </div>
                {/* right */}
                <div className='flex-1'>
                    <form className='flex flex-col gap-4'
                    //onSubmit={handleSubmit}
                    >
                        <div>
                            <Label value='Your username' />
                            <TextInput
                                type='text'
                                placeholder='Username'
                                id='username'
                            // onChange={handleChange}
                            />
                        </div>
                        <div>
                            <Label value='Your email' />
                            <TextInput
                                type='email'
                                placeholder='name@company.com'
                                id='email'
                            //onChange={handleChange}
                            />
                        </div>
                        <div>
                            <Label value='Your password' />
                            <TextInput
                                type='password'
                                placeholder='Password'
                                id='password'
                            //onChange={handleChange}
                            />
                        </div>
                        <Button
                            className='w-25 h-10 bg-violet-500 rounded-lg flex justify-center items-center'
                            type='submit'>
                            <div className='font-semibold'>SignUp</div>
                        </Button>
                    </form>
                    <div className='flex gap-2 text-sm mt-5'>
                        <span>Have an account?</span>
                        <Link to='/sign-in' className='text-blue-500'>
                            Sign In
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
