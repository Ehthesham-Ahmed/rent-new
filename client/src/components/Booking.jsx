import React, { useEffect, useState } from 'react'
import { differenceInCalendarDays } from 'date-fns';

export default function Booking({ booking }) {

    const [user, setUser] = useState({});
    //console.log(user);

    useEffect(() => {
        const getUser = async () => {
            try {
                const res = await fetch(`/api/user/${booking.userId}`);
                const data = await res.json();
                if (res.ok) {
                    setUser(data);
                }
            } catch (error) {
                console.log(error.message);
            }
        }
        getUser();
    }, [booking])

    return (
        <div className='flex p-4 border-b border-gray-500'>
            <div className='flex-shrink-0 mb-1'>
                <img className='w-10 h-10 rounded-full border border-black m-2'
                    src='https://icons.veryicon.com/png/o/miscellaneous/two-color-icon-library/user-286.png'
                    alt={user.username} />
                <div className='flex items-center mb-1'>
                    <span className='font-bold mr-1 text-sm truncate'> {user ? `@${user.username}` : 'anonymous user'} </span>
                </div>
            </div>
            <div className='p-1'>
                <p className='m-2'>From Date: {new Date(booking.startDate).toLocaleDateString()} </p>
                <p className='m-2'>To Date: {new Date(booking.endDate).toLocaleDateString()} </p>
                {/* <p> {booking.totalPrice} </p> */}
            </div>
        </div>
    )
}
