import React, { useEffect, useState } from 'react'
import PostCard from '../components/PostCard';
import { Link } from 'react-router-dom';

export default function Home() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
            const res = await fetch('/api/post/getposts');
            const data = await res.json();
            setPosts(data.posts);
        }
        fetchPosts();
    }, []);
    return (
        <div className='max-w-6xl mx-auto p-3 flex flex-col gap-8 py-7'>
            {
                posts && posts.length > 0 && (
                    <div className='flex flex-col gap-6'>
                        <h2 className='text-3xl font-bold text-center'>Rentals</h2>
                        <div className='flex flex-wrap gap-4'>
                            {posts.map((post) => (
                                <PostCard key={post._id}
                                    post={post} />
                            ))}
                        </div>
                        <Link to={'/search'}
                            className='text-lg text-teal-500 hover:underline text-center'>
                            Filter
                        </Link>
                    </div>
                )
            }
        </div>
    )
}