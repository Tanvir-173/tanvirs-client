import React from 'react';
import { Outlet } from 'react-router';
import Footer from '../Pages/Shared/Footer/Footer';
import NavBer from '../Pages/Shared/NavBer/NavBer';

const RootLayout = () => {
    return (
        <div className="max-w-7xl mx-auto">
            <NavBer></NavBer>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default RootLayout;