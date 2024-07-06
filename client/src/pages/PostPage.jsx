import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

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
                className='mt-10 p-3 max-h-[600px] w-full object-cover'
            />
            <div className='border-b-4 border-dotted border-red-300 m-4'></div>
            <div className='text-center border-2 border-emerald-500 rounded-3xl p-4 flex flex-col gap-4'>
                <p className='font-bold'>Seats:  <span className='font-semibold text-gray-700'> {post && post.seats} </span> </p>
                <p className='font-bold'>Fuel type: <span className='font-semibold text-gray-700'> {post && post.fuel} </span></p>
                <p className='font-bold'>Price/Day: <span className='font-semibold text-gray-700'> {post && post.price} </span></p>
            </div>
            <div className='border-b-4 border-dotted border-red-300 m-4'></div>
        </main>
    )
}
