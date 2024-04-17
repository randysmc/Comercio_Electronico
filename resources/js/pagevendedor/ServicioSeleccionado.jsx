import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Config from '../Config';
import AuthUser from '../pageauth/AuthUser';
import { Link, useNavigate } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const ServicioSeleccionado = () => {
    const { getToken, getUser } = AuthUser()
    const { id } = useParams();
    const [servicio, setServicio] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const voluntario = getUser();
    const navigate = useNavigate();

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

    // Función para manejar la acción de realizar el trueque
    const handleRealizarTrueque = () => {
        // Aquí puedes enviar la petición POST para realizar el trueque
        const data = {
            user_id_publicador: servicio.user_id,
            id_servicio: servicio.id,
            creditos: servicio.precio,
            user_id_voluntario: voluntario.id
        };

        Config.getVoluntarioStore(getToken(), data)
            .then(response => {
                console.log("Trueque realizado con éxito", response.data);
                setShowModal(false);
                navigate('/usuario', {state:{succesMessage: "Operacion realizada con exito"} });
                
            })
            .catch(error => {
                console.error("Error al realizar el trueque", error);
                // Aquí puedes mostrar un mensaje de error al usuario si lo deseas
            });
    };

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
                            <Link to='/usuario/servicio' className='btn btn-secondary'>Regresar</Link>
                            <Button variant="primary" onClick={() => setShowModal(true)}>Realizar Trueque</Button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal para confirmar el trueque */}
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirmar Trueque</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Estás a punto de realizar un trueque con los siguientes detalles:</p>
                    <p>Usuario publicador: {servicio.user.name}</p>
                    <p>nombre del servicio: {servicio.nombre}</p>
                    <p>Precio del servicio: {servicio.precio} {servicio.moneda.nombre}</p>
                    <p>¿Deseas proceder con el trueque?</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>Cancelar</Button>
                    <Button variant="primary" onClick={handleRealizarTrueque}>Aceptar</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default ServicioSeleccionado;

