import React from 'react';
import Navber from '../Component/Navber/Navber';
import { Outlet } from 'react-router';
import Footer from '../Page/Footer/Footer';

const RootLayout = () => {
    return (
        <div className='flex flex-col min-h-screen'>
            <Navber></Navber>

            <div className='flex-1'>
                <Outlet></Outlet>
            </div>

            <Footer></Footer>
        </div>
    );
};

export default RootLayout;