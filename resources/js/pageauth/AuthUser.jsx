import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthUser = () => {
    const navigate = useNavigate();

    const getToken = () => {
        const tokenString = sessionStorage.getItem('token');
        const token = JSON.parse(tokenString);
        return token;
    };

    const getUser = () => {
        const userString = sessionStorage.getItem('user');
        const user = JSON.parse(userString);
        return user;
    };

    const getRol = () => {
        const rolString = sessionStorage.getItem('rol');
        const rol = JSON.parse(rolString);
        return rol;
    };

    const [token, setToken] = useState(getToken());
    const [user, setUser] = useState(getUser());
    const [rol, setRol] = useState(getRol());

    const saveToken = (user, token, rol) => {
        sessionStorage.setItem('user', JSON.stringify(user));
        sessionStorage.setItem('token', JSON.stringify(token));
        sessionStorage.setItem('rol', JSON.stringify(rol));

        setUser(user);
        setToken(token);
        setRol(rol);

        //rol: admin | comprador | vendedor | voluntario

        if (getRol() === "admin") navigate("/admin");

        if (getRol() === "vendedor") navigate("/vendedor");

        if (getRol() === "comprador") navigate("/comprador");

        if (getRol() === "voluntario") navigate("/voluntario");
    };

    const getLogout = () =>{
        sessionStorage.clear()
        navigate('/')
    }

    return {
        setToken:saveToken,
        token,
        user,
        rol,
        getToken, getRol, getUser, getLogout,
    }
};

export default AuthUser;
