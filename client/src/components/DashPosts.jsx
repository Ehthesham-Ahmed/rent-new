import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button, Modal } from 'flowbite-react';
import { HiOutlineExclamationCircle } from 'react-icons/hi';

export default function DashPosts() {
    const { currentUser } = useSelector((state) => state.user);
    const [userPosts, setUserPosts] = useState([]);
    const [showMore, setShowMore] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [postIdToDelete, setPostIdToDelete] = useState('');
    //console.log(userPosts);
    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const res = await fetch(`/api/post/getposts?userId=${currentUser._id}`);
                const data = await res.json();
                if (res.ok) {
                    setUserPosts(data.posts);
                    if (data.posts.length < 9) {
                        setShowMore(false);
                    }
                }
            } catch (error) {
                console.log(error.message);
            }
        };
        if (currentUser.isAdmin) {
            fetchPosts();
        }
    }, [currentUser._id]);

    const handleShowMore = async () => {
        const startIndex = userPosts.length;
        try {
            const res = await fetch(
                `/api/post/getposts?userId=${currentUser._id}&startIndex=${startIndex}`
            );
            const data = await res.json();
            if (res.ok) {
                setUserPosts((prev) => [...prev, ...data.posts]);
                if (data.posts.length < 9) {
                    setShowMore(false);
                }
            }
        } catch (error) {
            console.log(error.message);
        }
    };

    const handleDeletePost = async () => {
        setShowModal(false);
        try {
            const res = await fetch(
                `/api/post/deletepost/${postIdToDelete}/${currentUser._id}`,
                {
                    method: 'DELETE',
                }
            );
            const data = await res.json();
            if (!res.ok) {
                console.log(data.message);
            } else {
                setUserPosts((prev) =>
                    prev.filter((post) => post._id !== postIdToDelete)
                );
            }
        } catch (error) {
            console.log(error.message);
        }
    };

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
                                            <span className="font-medium text-red-600 hover:underline cursor-pointer"
                                                onClick={() => {
                                                    setShowModal(true);
                                                    setPostIdToDelete(post._id);
                                                }}
                                            >Delete</span>
                                        </td>
                                    </tr>
                                </tbody>
                            ))}
                        </table>
                    </div>
                    {showMore && (
                        <button
                            onClick={handleShowMore}
                            className='w-full text-teal-500 self-center text-sm py-7'
                        >
                            Show more
                        </button>
                    )

                    }
                </>
            ) : (
                <p> No cars posted in last month </p>
            )}
            <Modal
                show={showModal}
                onClose={() => setShowModal(false)}
                popup
                size='md'
            >
                <Modal.Header />
                <Modal.Body>
                    <div className='text-center'>
                        <HiOutlineExclamationCircle className='h-14 w-14 text-gray-400 mb-4 mx-auto' />
                        <h3 className='mb-5 text-lg text-gray-500'>
                            Are you sure you want to delete this car?
                        </h3>
                        <div className='flex justify-center gap-4'>
                            <Button color='failure'
                                className='bg-red-500 text-white w-24 h-8 flex items-center justify-center'
                                onClick={handleDeletePost}>
                                Yes, I'm sure
                            </Button>
                            <Button color='gray'
                                className='text-white bg-green-500 w-20 flex items-center justify-center'
                                onClick={() => setShowModal(false)}>
                                No, cancel
                            </Button>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    )
}
