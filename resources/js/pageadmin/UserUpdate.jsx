import React, { useEffect, useState } from 'react';
import Config from '../Config';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Sidebar from './Sidebar';
import AuthUser from "../pageauth/AuthUser";

const UserUpdate = () => {
    const { getRol, getLogout, getToken } = AuthUser();
    const navigate = useNavigate();
    const { id } = useParams();
    const [userData, setUserData] = useState({
        name: '',
        lastname: '',
        username: '',
        email: '',
        aprobado: false
    });

    useEffect(() => {
        const getUserById = async () => {
            try {
                const response = await Config.getUserById(getToken(), id);
                const { name, lastname, username, email, aprobado } = response.data;
                setUserData({ name, lastname, username, email, aprobado });
            } catch (error) {
                console.error("Error al obtener usuario:", error);
            }
        };
        getUserById();
    }, [id]);

    const handleToggleAprobado = () => {
        setUserData(prevState => ({ ...prevState, aprobado: !prevState.aprobado }));
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserData(prevState => ({ ...prevState, [name]: value }));
    };

    const submitUpdate = async (e) => {
        e.preventDefault();
        try {
            const data = {aprobado: userData.aprobado}
            await Config.getUserUpdate(getToken(), data, id);
            navigate('/admin/user');
        } catch (error) {
            console.error("Error al actualizar usuario:", error);
        }
    };

    return (
        <div className='container bg-light'>
            <div className='row'>
                <Sidebar />
                <div className='col-sm-9 mt-3 mb-3'>
                    <div className='card'>
                        <div className='card-header'>Editar Usuario</div>
                        <div className='card-body'>
                            <form onSubmit={submitUpdate}>
                                <div className='mb-3'>
                                    <label htmlFor='name'>Nombre</label>
                                    <input type='text' className='form-control' name='name' value={userData.name} onChange={handleInputChange} />
                                </div>
                                <div className='mb-3'>
                                    <label htmlFor='lastname'>Apellido</label>
                                    <input type='text' className='form-control' name='lastname' value={userData.lastname} onChange={handleInputChange} />
                                </div>
                                <div className='mb-3'>
                                    <label htmlFor='username'>Nombre de usuario</label>
                                    <input type='text' className='form-control' name='username' value={userData.username} onChange={handleInputChange} />
                                </div>
                                <div className='mb-3'>
                                    <label htmlFor='email'>Email</label>
                                    <input type='email' className='form-control' name='email' value={userData.email} onChange={handleInputChange} />
                                </div>
                                <div className='form-check form-switch mb-3'>
                                    <input className='form-check-input' type='checkbox' id='aprobado' name='aprobado' checked={userData.aprobado} onChange={handleToggleAprobado} />
                                    <label className='form-check-label' htmlFor='aprobado'>Aprobado</label>
                                </div>
                                <div className='btn-group mt-3'>
                                    <Link to='/admin/user' className='btn btn-secondary'>Regresar</Link>
                                    <button type='submit' className='btn btn-primary'>Actualizar</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserUpdate;
