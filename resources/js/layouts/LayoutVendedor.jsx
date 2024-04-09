import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Outlet, useNavigate } from 'react-router-dom';
import AuthUser from "../pageauth/AuthUser";

const LayoutVendedor = () => {
    // Obtener el rol del usuario
    const { getRol } = AuthUser();
    const navigate = useNavigate();

    useEffect(() => {
        // Verificar el rol del usuario y redirigir si es necesario
        const rol = getRol();
        if (rol !== "vendedor" && rol !== "comprador" && rol !== "visitante") {
            navigate("/");
        }
    }, []);

    // Obtener el nombre del rol para mostrar en el Navbar
    const getRolName = () => {
        const rol = getRol();
        switch (rol) {
            case "vendedor":
                return "Vendedor";
            case "comprador":
                return "Comprador";
            case "visitante":
                return "Visitante";
            default:
                return "Rol Desconocido";
        }
    };

    return (
        <div>
            <Navbar rol={getRolName()} />
            <Outlet />
            <Footer />
        </div>
    );
};

export default LayoutVendedor;
