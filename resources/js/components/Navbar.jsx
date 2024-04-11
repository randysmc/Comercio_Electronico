import React from 'react';
import AuthUser from '../pageauth/AuthUser';
import Config from '../Config';

const Navbar = () => {
  const { getUser, getLogout, getToken } = AuthUser();

  const logoutUser = () => {
    const token = getToken(); // Obtener el token de la función getToken
    Config.getLogout(token)
      .then(response => {
        console.log(response);
        getLogout(); // Llamar a la función getLogout para borrar el token de sesión almacenado
      })
      .catch(error => {
        console.error("Error al realizar el logout:", error);
        // Manejar el error según sea necesario
      });
  }

  const renderLinks = () => {
    const user = getUser(); // Obtener los datos del usuario
    if (getToken()) {
      return (
        <>
          <li className="nav-item">
            <a className="nav-link" href={`/usuario`} >Acciones</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#" onClick={logoutUser}>Logout</a>
          </li>
          {/* Mostrar el nombre del usuario */}
          <li className="nav-item">
            <span className="nav-link">Usuario: {user ? user.name : ''}</span>
          </li>
        </>
      );
    } else {
      return (
        <>
          <li className="nav-item">
            <a className="nav-link" href="/login">Login</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/register">Registrarse</a>
          </li>
        </>
      );
    }
  };

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <a className="navbar-brand" href="/">Comercio Electronico</a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="/">Home</a>
            </li>
            {renderLinks()}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
