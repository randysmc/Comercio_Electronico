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
        <div className="flex flex-col min-h-screen">
            <Navbar rol={getRolName()} />
            <div className="container mx-auto flex-grow">
                <div className="bg-blue-200 p-4 mb-4 rounded-md">
                    <p className="text-lg text-center text-blue-900">
                        Bienvenido a nuestra plataforma de comercio electrónico. Aquí puedes comprar, vender, ofrecer servicios, realizar transacciones seguras y comunicarte con otros usuarios. ¡Disfruta tu experiencia de compra y venta!
                    </p>
                </div>
                <Outlet />
            </div>
            <Footer />
        </div>
    );
};

export default LayoutVendedor;

