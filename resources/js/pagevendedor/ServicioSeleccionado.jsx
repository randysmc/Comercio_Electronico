import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Config from '../Config';
import AuthUser from '../pageauth/AuthUser';
import { Link } from 'react-router-dom';

const ServicioSeleccionado = () => {
    const {getToken, getUser} = AuthUser()
    const { id } = useParams();
    const [servicio, setServicio] = useState(null);

    useEffect(() => {
        // Función para obtener detalles del servicio por su ID
        const getServicioById = async () => {
            try {
                const response = await Config.getServicioById(getToken(), id);
                const servicioData = response.data;
                setServicio(servicioData);
            } catch (error) {
                console.error("Error al obtener detalles del servicio", error);
            }
        };
        getServicioById();
    }, [id]); // Asegúrate de incluir id en la lista de dependencias

    // Renderizar mensaje mientras se carga el servicio
    if (!servicio) {
        return <div>Cargando servicio...</div>;
    }

    return (
        <div className="container bg-light">
            <div className="row justify-content-center mt-5">
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-body">
                            <img src={servicio.urlfoto} className="card-img-top" alt={servicio.nombre} />
                            <h5 className="card-title">{servicio.nombre}</h5>
                            <p className="card-text">{servicio.descripcion}</p>
                            <p className="card-text">Pago: {servicio.precio} créditos</p>
                            {/* Agregar aquí más detalles del servicio si es necesario */}
                            <Link to='/usuario/producto' className='btn btn-secondary'>Regresar</Link>
                           {/** <Link to={`/usuario/servicio/compra?precio=${servicioData.precio}&user_id_vendedor=${servicioData.user_id}&user_id_comprador=${comprador.id}&id_servicio=${servicioData.id}`} className='btn btn-primary'>Comprar</Link> */}

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ServicioSeleccionado;
