import { Alert, Button } from 'flowbite-react';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom';
import { differenceInCalendarDays } from 'date-fns';
import Booking from './Booking';



export default function BookSection({ postId }) {
    const { currentUser } = useSelector(state => state.user);
    const { postSlug } = useParams();
    const [error, setError] = useState(false);
    const [post, setPost] = useState(null);
    const [bookings, setBookings] = useState([]);
    //console.log(bookings);

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

    const today = new Date().toISOString().split('T')[0];
    const [fromDate, setFromDate] = useState('');
    const [toDate, setToDate] = useState('');
    const [bookError, setBookError] = useState(null);
    const [price, setPrice] = useState(0);
    //console.log(req.body);
    //const cost = post && post.price;
    //console.log(fromDate, toDate);
    // const calculatePrice = () => {
    //     const daysDifference = differenceInCalendarDays(new Date(toDate), new Date(fromDate));
    //     return daysDifference === 0 ? post.price : daysDifference * post.price;
    // };
    //console.log(calculatePrice);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!startDate || !endDate) {
            return;
        }
        // const calculatedPrice = calculatePrice(fromDate, toDate);
        // console.log(calculatedPrice);
        try {
            const res = await fetch('/api/book/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ postId, userId: currentUser._id, startDate: fromDate, endDate: toDate }),
            });
            const data = await res.json();
            if (res.ok) {
                setFromDate('');
                setToDate('');
                setBookError(null);
                setBookings([data, ...bookings]);
                setPrice(0);
                // const daysDifference = differenceInCalendarDays(new Date(toDate), new Date(fromDate));
                // const calculatedPrice = daysDifference === 0
                //     ? post.price
                //     : daysDifference * post.price;
                // setPrice(calculatedPrice);
            }
        } catch (error) {
            setBookError(error.message);
        }
    };

    useEffect(() => {
        const getBookings = async () => {
            try {
                const res = await fetch(`/api/book/getCarBookings/${postId}`);
                if (res.ok) {
                    const data = await res.json();
                    setBookings(data);
                }
            } catch (error) {
                console.log(error);
            }
        }
        getBookings();
    }, [postId])

    return (
        <div className='max-w-2xl mx-auto w-full p-3'>
            {currentUser ?
                (
                    <div className='flex items-center gap-1 my-5 text-gray-500 text-sm'>
                        <p> Singed In as: </p>
                        <Link to={'/dashboard?tab=profile'}
                            className='text-sm text-cyan-600 hover:underline'>
                            @{currentUser.username}
                        </Link>
                    </div>
                ) : (
                    <div className='text-sm my-5 flex gap-2'>
                        Singn In to book
                        <Link to={'/sign-in'}
                            className='text-blue-500 hover:underline'>
                            Sign In
                        </Link>
                    </div>
                )}
            {currentUser && (
                <form className='p-3'
                    onSubmit={handleSubmit}>
                    <div className=''>
                        <div className='bg-slate-200 rounded-2xl border-2 border-teal-500 shadow-lg p-4'>
                            <div className='text-center text-2xl'>
                                Price: Rs {post && post.price} / Day
                            </div>
                            <div className='flex flex-col border border-black rounded-2xl mt-4'>
                                <div className='py-4 px-4'>
                                    <label className='block'>From date:</label>
                                    <input type='date'
                                        className='mt-1 w-full'
                                        min={today}
                                        value={fromDate}
                                        id='startDate'
                                        onChange={e => setFromDate(e.target.value)}
                                    />
                                </div>
                                <div className='py-4 px-4 border-t border-black'>
                                    <label className='block'>To date:</label>
                                    <input type='date'
                                        className='mt-1 w-full'
                                        value={toDate}
                                        min={fromDate}
                                        id='endDate'
                                        onChange={e => setToDate(e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>


                    {
                        fromDate && toDate && (
                            <div className="p-4 mt-4 text-center bg-red-200 rounded-lg shadow-md">
                                <>
                                    <p>Your total cost is: Rs</p>
                                    <span className="text-lg font-semibold text-[#a30463]"
                                        id='price'>
                                        {
                                            differenceInCalendarDays(new Date(toDate), new Date(fromDate)) === 0
                                                ? (post && post.price)
                                                : differenceInCalendarDays(new Date(toDate), new Date(fromDate)) * (post && post.price)
                                        }
                                    </span>

                                    {/* <span className="text-lg font-semibold text-[#a30463]"
                                        id="price">
                                        {price}
                                    </span> */}
                                </>
                            </div>
                        )

                    }

                    <Button className='text-white w-40 h-10 flex items-center bg-violet-700 border-4 border-cyan-200 mx-auto mt-4'
                        type='submit'>
                        Book Now
                    </Button>
                    {bookError &&
                        (<Alert className='text-red-500 my-5'> {bookError} </Alert>)
                    }
                </form>
            )}
            {currentUser.isAdmin && bookings.length === 0 ? (
                <p className='test-sm my-5'>No Bookings yet</p>
            ) : (
                <>
                    <div className='text-sm my-5 flex items-center gap-1'>
                        <p>Bookings:</p>
                        <div className='border border-gray-500 py-1 px-2 rounded-lg'>
                            <p> {bookings.length} </p>
                        </div>
                    </div>
                    {
                        bookings.map(booking => (
                            <Booking key={booking._id}
                                booking={booking} />
                        ))
                    }
                </>
            )}
        </div >
    )
}
