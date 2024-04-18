import React from 'react';
import AuthUser from '../pageauth/AuthUser';
import Config from '../Config';

const Navbar = () => {
  const { getUser, getLogout, getToken } = AuthUser();

  const logoutUser = () => {
    const token = getToken();
    Config.getLogout(token)
      .then(response => {
        console.log(response);
        getLogout();
      })
      .catch(error => {
        console.error("Error al realizar el logout:", error);
      });
  }

  const renderLinks = () => {
    const user = getUser();
    if (getToken()) {
      return (
        <>
          <li className="nav-item">
            <a className="nav-link" href={`/usuario`} >Acciones</a>
          </li>
          <li className="nav-item">
            <span className="nav-link">Usuario: {user ? user.name : ''}</span>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#" onClick={logoutUser}>Logout</a>
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
        <div className="collapse navbar-collapse justify-content-between" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="/about">About</a>
            </li>
          </ul>
          <ul className="navbar-nav">
            {renderLinks()}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
