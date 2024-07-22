import React, { useEffect, useState } from 'react'
import { Modal, Button } from 'flowbite-react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom';

export default function DashBookings() {
    const { currentUser } = useSelector((state) => state.user);
    const [bookings, setBookings] = useState([]);
    const [showMore, setShowMore] = useState(true);
    const [bookingIdToDelete, setBookingIdToDelete] = useState('');

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const res = await fetch(`/api/book/getbookings`);
                const data = await res.json();
                if (res.ok) {
                    setBookings(data.bookings);
                    if (data.bookings.length < 9) {
                        setShowMore(false);
                    }
                }
            } catch (error) {
                console.log(error.message);
            }
        };
        if (currentUser.isAdmin) {
            fetchBookings();
        }
    }, [currentUser._id]);

    const handleShowMore = async () => {
        const startIndex = bookings.length;
        try {
            const res = await fetch(
                `/api/book/getbookings?startIndex=${startIndex}`
            );
            const data = await res.json();
            if (res.ok) {
                setBookings((prev) => [...prev, ...data.bookings]);
                if (data.bookings.length < 9) {
                    setShowMore(false);
                }
            }
        } catch (error) {
            console.log(error.message);
        }
    };

    return (
        <div>
            <div className='relative table-auto md:mx-auto my-6 overflow-y-auto overflow-x-auto scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300'>
                {currentUser.isAdmin ? (
                    <>


                        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                            <table className="min-w-full text-sm text-left rtl:text-right text-gray-500">
                                <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                                    <tr>
                                        <th scope="col" className="px-6 py-3">
                                            Car ID
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            User ID
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            From Date
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            To Date
                                        </th>
                                        {/* <th scope="col" className="px-6 py-3">
                                            User ID
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            From Date
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            To Date
                                        </th> */}
                                        {/* <th scope="col" class="px-6 py-3">
                                        <span class="sr-only">Delete</span>
                                    </th> */}
                                    </tr>
                                </thead>
                                {bookings.map((book) => (
                                    <tbody key={book._id}>
                                        <tr className="bg-white border-b hover:bg-gray-50">
                                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                                {book.postId}

                                            </th>
                                            <td className="px-6 py-4">
                                                {book.userId}
                                            </td>
                                            <td className="px-6 py-4">
                                                {new Date(book.startDate).toLocaleDateString()}
                                            </td>
                                            <td className="px-6 py-4">
                                                {new Date(book.endDate).toLocaleDateString()}
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
            </div>
        </div>
    )
}
