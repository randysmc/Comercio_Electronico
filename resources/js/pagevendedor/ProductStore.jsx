import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Config from '../Config';
import SidebarVendedor from './SidebarVendedor';
import AuthUser from '../pageauth/AuthUser';

const ProductStore = () => {
    const { getUser } = AuthUser();
    const user = getUser();

    const [nombre, setNombre] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [precio, setPrecio] = useState('');
    const [urlfoto, setUrlfoto] = useState('');
    const [categoria_id, setCategoriaId] = useState('');
    const [user_id, setUser] = useState(user.id);
    const [categorias, setCategorias] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        setUser(user.id);
        //getCategoriaAll();
    }, [user]);



    const handleInputChange = (e) => {
        const files = e.target.files;
        const reader = new FileReader();
        reader.readAsDataURL(files[0]);
        reader.onload = (e) => {
            setUrlfoto(e.target.result);
        };
    };

    const submitStore = async (e) => {
        e.preventDefault();
        await Config.getProductoStore({ nombre, precio, descripcion, urlfoto, categoria_id, user_id });
        navigate('vendedor/producto');
    };

    return (
        <div className='container bg-light'>
            <div className='row'>
                <SidebarVendedor />
                <div className='col-sm-9 mt-3 mb-3'>
                    <div className='card'>
                        <div className='card-body'>
                            <form onSubmit={submitStore}>
                                <div className='form-group row'>
                                    <div className='col-sm-8'>
                                        <label>Nombre</label>
                                        <input className='form-control' value={nombre} onChange={(e) => setNombre(e.target.value)} type='text'></input>
                                    </div>
                                    <div className='col-sm-4'>
                                        <label>Precio</label>
                                        <input className='form-control' value={precio} onChange={(e) => setPrecio(e.target.value)} type='number'></input>
                                    </div>
                                    <div className='col-sm-4'>
                                        <label>Categoria</label>
                                        <select className='form-control' value={categoria_id} onChange={(e) => setCategoriaId(e.target.value)}>
                                            <option value=''>Seleccionar categoría</option>
                                            {categorias.map((categoria) => (
                                                <option key={categoria.id} value={categoria.id}>{categoria.nombre}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                                <div className='mt-3'>
                                    <label>Descripción:</label>
                                    <textarea className='form-control' value={descripcion} onChange={(e) => setDescripcion(e.target.value)} />
                                </div>
                                <div className='mt-3'>
                                    <label>Imagen</label>
                                    <input className='form-control' type='file' onChange={(e) => handleInputChange(e)} />
                                </div>
                                <div className='btn-group mt-3'>
                                    <Link to={-1} className='btn btn-secondary'> Regresar </Link>
                                    <button type='submit' className='btn btn-primary'>Crear producto </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductStore;
