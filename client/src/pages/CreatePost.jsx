import { Alert, Button, FileInput, Select, TextInput } from 'flowbite-react'
import React, { useState } from 'react'
import { HiChevronRight, HiTicket } from 'react-icons/hi';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { app } from '../firebase';

export default function CreatePost() {
    const [file, setFile] = useState(null);
    const [imageUploadProgress, setImageUploadProgress] = useState(null);
    const [imageUploadError, setImageUploadError] = useState(null);
    const [formData, setFormData] = useState({});

    const handleUploadImage = async () => {
        try {
            if (!file) {
                setImageUploadError('Please choose an image file');
                return;
            }
            setImageUploadError(null);
            const storage = getStorage(app);
            const fileName = new Date().getTime() + '-' + file.name;
            const storageRef = ref(storage, fileName);
            const uploadTask = uploadBytesResumable(storageRef, file);
            uploadTask.on(
                'state_changed',
                (snapshot) => {
                    const progress =
                        (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    setImageUploadProgress(progress.toFixed(0));
                },
                (error) => {
                    setImageUploadError('Image upload failed');
                    setImageUploadProgress(null);
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        setImageUploadProgress(null);
                        setImageUploadError(null);
                        setFormData({ ...formData, image: downloadURL });
                    });
                }
            );
        } catch (error) {
            setImageUploadError('Image upload failed');
            setImageUploadProgress(null);
            console.log(error);
        }
    }

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
                        onChange={(e) => setFile(e.target.files[0])}
                    />
                    <Button type='button'
                        className='bg-amber-500 text-black border-2 border-green-600 w-40 h-10 flex items-center justify-center'
                        onClick={handleUploadImage}
                        disabled={imageUploadProgress}>
                        {
                            imageUploadProgress ? (
                                <div className='text-green-600'>
                                    Uploading...
                                </div>
                            ) : (
                                'Upload car pic'
                            )
                        }
                    </Button>
                    {/* <ReactQuill theme="snow"/> */}
                </div>
                {
                    imageUploadError && <Alert className='text-red-600'> {imageUploadError} </Alert>
                }
                {
                    formData.image && (
                        <img
                            src={formData.image}
                            alt='upload'
                            className='w-full h-72 object-cover'
                        />
                    )}
                <Button className='text-black bg-indigo-300 border-2 border-indigo-700 h-8 flex items-center justify-center'>
                    Done
                </Button>
            </form>
        </div>
    )
}
