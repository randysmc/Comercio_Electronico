import React from 'react';
import AuthUser from '../pageauth/AuthUser';
import Config from '../Config';

const Navbar = () => {

  const {getRol, getLogout, getToken} = AuthUser()

  const logoutUser = () => {
    Config.getLogout('/logout')
    .then(response => {
      console.log(response)
      getLogout()
    }).catch(error => {
      console.log(error)
    })
  }
  
  

  console.log('Token de sesión almacenado:', getToken());
  console.log('Rol de persona autenticada:', getRol());

  const renderLinks = () => {
    if(getToken()){
      return(
        <>
          <li className="nav-item">
            <a className="nav-link" href={`/${getRol()}`} >Acciones</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#" onClick={logoutUser}>Logout</a>
          </li>
        </>
      )
    }else{
      return(
        <>
          <li className="nav-item">
            <a className="nav-link" href="/login" >Login</a>
          </li>
        </>
      )
    }
  }

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <a className="navbar-brand" href="/">Comercio Electronico</a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="/">Home</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/categoria">Categorias</a>
            </li>
            {renderLinks()}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
