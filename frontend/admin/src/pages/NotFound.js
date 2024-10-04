import React from 'react';
import Header from './Header.js';
import Footer from './Footer.js';

const NotFound = () => {
    return (
        <>
            <Header/>
            <div style={{ textAlign: 'center', margin: '16%' }}>
                <h1>404 - Page Not Found</h1>
                <p>Sorry, the page you are looking for does not exist.</p>
            </div>
            <Footer/>
        </>
    );
};

export default NotFound;
