import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { PiSeatFill } from "react-icons/pi";
import { BsFillFuelPumpFill } from "react-icons/bs";
import { FaMoneyBill1Wave } from "react-icons/fa6";
import BookSection from '../components/BookSection';


export default function PostPage() {
    const { postSlug } = useParams();
    const [error, setError] = useState(false);
    const [post, setPost] = useState(null);
    //console.log(post);

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const res = await fetch(`/api/post/getposts?slug=${postSlug}`);
                const data = await res.json();
                if (!res.ok) {
                    setError(true);
                    return;
                }
                if (res.ok) {
                    setPost(data.posts[0]);
                    setError(false);
                }
            } catch (error) {
                setError(true);
            }

        }
        fetchPost();
    }, [postSlug]);

    return (
        <main className='p-3 flex flex-col max-w-6xl mx-auto min-h-screen'>
            <h1 className='text-3xl mt-10 p-3 text-center font-serif max-w-2xl mx-auto lg:text-4xl border-b-2 border-amber-500'>
                {post && post.carcompany} <span className='p-3'> {post && post.carname} </span>

            </h1>
            <img
                src={post && post.image}
                alt={post && post.title}
                className='mt-10 p-3 max-h-[600px] w-full object-cover rounded-3xl border border-black'
            />
            <div className='border-b-4 border-dotted border-red-300 m-4'></div>
            <div className='text-center items-center border-2 border-emerald-500 rounded-tl-3xl rounded-br-3xl p-4 flex flex-col gap-4'>
                <p className='font-bold flex items-center'> <PiSeatFill className='mr-3' /> Seats:  <span className='font-semibold text-gray-700 ml-2'> {post && post.seats} </span> </p>
                <p className='font-bold flex items-center'> <BsFillFuelPumpFill className='mr-3' /> Fuel type: <span className='font-semibold text-gray-700 ml-2'> {post && post.fuel} </span></p>
                <p className='font-bold flex items-center'> <FaMoneyBill1Wave className='mr-3' /> Price/Day: <span className='font-semibold text-gray-700 ml-2'> {post && post.price} </span></p>
            </div>
            <div className='border-b-4 border-dotted border-red-300 m-4'></div>
            <BookSection postId={post && post._id} />
        </main>
    )
}
