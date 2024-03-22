import React, { useState } from 'react';
import Sidebar from './Sidebar';
import { Link, useNavigate } from 'react-router-dom';
import Config from '../Config';
import AuthUser from '../pageauth/AuthUser';

const CategoriaStore = () => {
    const {getToken} = AuthUser()
    const [nombre, setNombre] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [urlfoto, setUrlfoto] = useState('');
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        let files = e.target.files;
        let reader = new FileReader();
        reader.readAsDataURL(files[0]);
        reader.onload = (e) =>{
            setUrlfoto(e.target.result);
        };
    };

    // Comunicación con el servidor para almacenar la categoría
    const submitStore = async (e) => {
        e.preventDefault();

        // Obtener el token de autenticación del almacenamiento local
        const token = getToken();

        // Crear el objeto con los datos de la categoría
        const data = {
            nombre: nombre,
            descripcion: descripcion,
            urlfoto: urlfoto
        };

        // Enviar la solicitud al servidor para almacenar la categoría
        try {
            await Config.getCategoriaStore(token, data);
            // Navegar a la página de categorías después de almacenar la categoría exitosamente
            navigate('/admin/categoria');
        } catch (error) {
            // Manejar cualquier error que pueda ocurrir durante la solicitud
            console.error("Error al almacenar la categoría:", error);
        }
    };

    return (
        <div className='container bg-light'>
            <div className='row'>
                <Sidebar/>
                <div className='col-sm-9 mt-3 mb-3'>
                    <div className='card'> 
                        <div className='card-body'>
                            <form onSubmit={submitStore}>
                                <div className='form-group row'>
                                    <div className='col-sm-8'>
                                        <label>Nombre</label>
                                        <input className='form-control' value={nombre} onChange={(e)=>setNombre(e.target.value)} type='text' />
                                    </div>
                                </div>
                                <div className='mt-3'>
                                    <label>Descripción:</label>
                                    <textarea className='form-control' value={descripcion} onChange={(e)=>setDescripcion(e.target.value)} />
                                </div>
                                <div className='mt-3'>
                                    <label>Imagen</label>
                                    <input className='form-control' type='file' onChange={(e)=>handleInputChange(e)} />
                                </div>
                                <div className='btn-group mt-3'>
                                    <Link to={-1} className='btn btn-secondary'> Regresar </Link>
                                    <button type='submit' className='btn btn-primary'>Crear Categoría </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CategoriaStore;
