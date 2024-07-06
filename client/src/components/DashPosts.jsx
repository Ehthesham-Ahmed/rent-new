import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

export default function DashPosts() {
    const { currentUser } = useSelector((state) => state.user);
    const [userPosts, setUserPosts] = useState([]);
    console.log(userPosts);
    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const res = await fetch(`/api/post/getposts?userId=${currentUser._id}`);
                const data = await res.json();
                if (res.ok) {
                    setUserPosts(data.posts);
                    // if (data.posts.length < 9) {
                    //     setShowMore(false);
                    // }
                }
            } catch (error) {
                console.log(error.message);
            }
        };
        if (currentUser.isAdmin) {
            fetchPosts();
        }
    }, [currentUser._id])
    return (
        <div className='relative table-auto md:mx-auto my-6 overflow-y-auto overflow-x-auto scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300'>
            {currentUser.isAdmin && userPosts.length > 0 ? (
                <>


                    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                        <table className="min-w-full text-sm text-left rtl:text-right text-gray-500">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                                <tr>
                                    <th scope="col" className="px-6 py-3">
                                        Car name
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Car company
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Image
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Price
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Seats
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Fuel type
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        DELETE
                                    </th>
                                    {/* <th scope="col" class="px-6 py-3">
                                        <span class="sr-only">Delete</span>
                                    </th> */}
                                </tr>
                            </thead>
                            {userPosts.map((post) => (
                                <tbody key={post._id}>
                                    <tr className="bg-white border-b hover:bg-gray-50">
                                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                            <Link to={`/post/${post.slug}`}>
                                                {post.carname}
                                            </Link>
                                        </th>
                                        <td className="px-6 py-4">
                                            <Link to={`/post/${post.slug}`}>
                                                {post.carcompany}
                                            </Link>
                                        </td>
                                        <td className="px-6 py-4">
                                            <Link to={`/post/${post.slug}`}>
                                                <img src={post.image}
                                                    alt={post.carcompany}
                                                    className='w-20 h-10 object-cover bg-gray-500 mt-2 my-4' />
                                            </Link>
                                        </td>
                                        <td className="px-6 py-4">
                                            {post.price}
                                        </td>
                                        <td className="px-6 py-4">
                                            {post.seats}
                                        </td>
                                        <td className="px-6 py-4">
                                            {post.fuel}
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <a href="#" className="font-medium text-red-600 hover:underline">Delete</a>
                                        </td>
                                    </tr>
                                </tbody>
                            ))}
                        </table>
                    </div>

                </>
            ) : (
                <p> No cars posted in last month </p>
            )}
        </div>
    )
}
