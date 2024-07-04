import { Button, FileInput, Select, TextInput } from 'flowbite-react'
import React from 'react'
import { HiChevronRight, HiTicket } from 'react-icons/hi';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

export default function CreatePost() {
    return (
        <div className='p-3 max-w-3xl mx-auto min-h-screen'>
            <h1 className='text-center text-3xl my-7 font-semibold'>Car Details</h1>
            <form className='flex flex-col gap-4  my-auto'>
                <div className='flex flex-col gap-4 sm:flex-row justify-between'>
                    <TextInput type='text'
                        placeholder='Car name'
                        required
                        id='carname' />
                    <TextInput type='text'
                        placeholder='Car company'
                        required
                        id='carcompany' />

                    <TextInput type='number'
                        placeholder='Price per day'
                        required
                        id='price' />
                    <Select required
                        id='fuel'>
                        <option value='uncategorized'>Fuel</option>
                        <option value='petrol'>Petrol</option>
                        <option value='diesel'>Diesel</option>
                        <option value='electric'>Electric</option>
                    </Select>
                    <Select required
                        id='seats'>
                        <option value='uncategorized'>Seats</option>
                        <option value='5seater'>5 Seater</option>
                        <option value='6seater'>6 Seater</option>
                        <option value='7seater'>7 Seater</option>
                    </Select>
                </div>
                {/* <div className='flex flex-col gap-4 sm:flex-row justify-between'>
                    <TextInput type='number'
                        placeholder='Per day price'
                        required
                        id='price' />
                </div> */}
                <div className='flex gap-4 items-center justify-between border-4 border-teal-500 border-dotted p-3'>
                    <FileInput
                        type='file'
                        accept='image/*'
                    //onChange={(e) => setFile(e.target.files[0])}
                    />
                    <Button type='button'
                        className='bg-amber-500 text-black border-2 border-green-600 w-40 h-10 flex items-center justify-center'>
                        Upload car pic
                    </Button>
                    {/* <ReactQuill theme="snow"/> */}
                </div>
                <Button className='text-black bg-indigo-300 border-2 border-indigo-700 h-8 flex items-center justify-center'>
                    Done
                </Button>
            </form>
        </div>
    )
}
