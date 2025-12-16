import React from 'react';
import { Outlet } from 'react-router';
import Aside from '../Component/Dashboard/Aside/Aside';

const DashboardLayout = () => {
    return (
        <div className='flex'>
            <Aside></Aside>
           <div className='flex-1 p-4'>
             <Outlet></Outlet>
           </div>
        </div>
    );
};

export default DashboardLayout;