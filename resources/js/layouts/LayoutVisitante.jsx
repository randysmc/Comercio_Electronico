import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import {Outlet, useNavigate} from 'react-router-dom'
import AuthUser from "../pageauth/AuthUser";

const LayoutVisitante = () => {
    //verifar que sea el rol de especifico

    const { getRol } = AuthUser();
    const navigate = useNavigate();

    useEffect(() => {
        if (getRol != "visitante") {
            navigate("/");
        }
    }, []);

    return (
        <div>
            <Navbar />
            <Outlet />
            <Footer />
        </div>
    );
};

export default LayoutVisitante;
