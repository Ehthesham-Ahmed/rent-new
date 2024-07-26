import React, { useEffect, useState } from 'react';

const Footer = () => {
    const [currentYear, setCurrentYear] = useState('');

    useEffect(() => {
        setCurrentYear(new Date().getFullYear());
    }, []);

    return (
        <footer>
            <p>© <span id="currentYear">{currentYear}</span> . All Rights Reserved</p>
        </footer>
    );
};

export default Footer;