import React, { useEffect, useState } from 'react';
import Config from '../Config';
import SidebarVendedor from './SidebarVendedor';
import { Link } from 'react-router-dom';
import AuthUser from '../pageauth/AuthUser';

const MisServicios = () => {
  const {getUser, getToken} = AuthUser();
  const user = getUser();
  const [services, setServices] = useState([]);

  useEffect(()=> 
  {
    getServices();
  },[])

  const getServices = async () => {
    const response = await Config.getUserServiceAll(getToken());
    const userServices = response.data;

    setServices(userServices);
  }
  console.log(services);


  return (
    <div className="container bg-light">
        <div className="row">
            <SidebarVendedor />
            <div className="col-sm-9 mt-3 mb-3">
                <Link to={'/usuario/servicio/create'} className='btn btn-primary'>Postear Servicio</Link>
                <div className="row row-cols-1 row-cols-md-2 g-4">
                    {!services ? (
                        <div className="col">
                            Cargando...
                        </div>
                    ) : (
                        services.map((service) => (
                            <div key={service.id} className="col">
                                <div className="card h-100">
                                    <img src={service.urlfoto} className="card-img-top" alt={service.nombre} style={{ maxWidth: '200px', height: 'auto' }} />
                                    <div className="card-body">
                                        <h5 className="card-title">{service.nombre}</h5>
                                        <p className="card-text">{service.descripcion}</p>
                                        <p className="card-text">Precio: {service.precio} {service.moneda ? service.moneda.nombre : ''}</p>
                                        
                                        <p className="card-text">Visitas: {service.visitas}</p>
                                        <Link to={`/vendedor/serviceo/edit/${service.id}`} className="btn btn-primary">Editar</Link>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    </div>
);
}

export default MisServicios