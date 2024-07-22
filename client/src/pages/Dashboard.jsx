import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import DashSidebar from '../components/DashSidebar';
import DashProfile from '../components/DashProfile';
import DashPosts from '../components/DashPosts';
import DashBookings from '../components/DashBookings';

export default function Dashboard() {
    const location = useLocation();
    const [tab, setTab] = useState('');
    useEffect(() => {
        const urlParams = new URLSearchParams(location.search);
        const tabFromUrl = urlParams.get('tab');
        if (tabFromUrl) {
            setTab(tabFromUrl);
        }
    }, [location.search]);

    return (
        <div className='min-h-screen flex flex-col md:flex-row'>
            <div className='md:w-56'>
                {/* Sidebar */}
                <DashSidebar />
            </div>

            {/* Profile */}
            {tab === 'profile' && <DashProfile />}

            {/* posts */}
            <div className='md:mx-auto sm:overflow-x-auto'>
                {tab === 'posts' && <DashPosts />}
            </div>

            {/* Bookings */}
            <div className='md:mx-auto sm:overflow-x-auto'>
                {tab === 'bookings' && <DashBookings />}
            </div>
        </div >
    )
}
