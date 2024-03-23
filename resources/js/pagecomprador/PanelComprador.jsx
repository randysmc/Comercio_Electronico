import React from 'react';
import SidebarComprador from './SidebarComprador';
import AuthUser from '../pageauth/AuthUser';

const PanelComprador = () => {
  const { getUser } = AuthUser();
  const user = getUser(); // Obtener el objeto de usuario

  return (
    <div className="container bg-light">
        <div className="row justify-content-center mt-5 mb-5">
            <SidebarComprador/>
            <div className="col-sm-9">
                <h1 className="text-center"> Comprador </h1>
            </div>
        </div>
    </div>
);
};

export default PanelComprador;
