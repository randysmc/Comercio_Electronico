import React, { useEffect } from "react";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import {Outlet, useNavigate} from 'react-router-dom'
import AuthUser from "../pageauth/AuthUser";

const LayoutComprador = () => {
    //verifar que sea el rol de especifico

    const { getRol } = AuthUser();
    const navigate = useNavigate();

    useEffect(() => {
        if (getRol() != "comprador") {
            navigate("/");
        }
    }, []);

    return (
        <div>
            <h1>Layout Comprador</h1>
            <Navbar />
            <Outlet />
            <Footer />
        </div>
    );
};

export default LayoutComprador;
