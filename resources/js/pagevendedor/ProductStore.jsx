import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Config from '../Config';
import SidebarVendedor from './SidebarVendedor';
import AuthUser from '../pageauth/AuthUser';

const ProductStore = () => {
    const { getUser, getToken } = AuthUser();
    const user = getUser();

    const [nombre, setNombre] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [precio, setPrecio] = useState('');
    const [urlfoto, setUrlfoto] = useState('');
    const [categoria_id, setCategoriaId] = useState('');
    const [categorias, setCategorias] = useState([]);
    const [categoriasCargadas, setCategoriasCargadas] = useState(false);
    const [imagen, setImagen] = useState(null); // Estado para almacenar la imagen seleccionada
    const navigate = useNavigate();

    useEffect(() => {
        obtenerCategorias();
    }, []);

    const obtenerCategorias = async () => {
        try {
            const response = await Config.getVendedorCategoriaAll(getToken());
            setCategorias(response.data);
            setCategoriasCargadas(true);
        } catch (error) {
            console.error("Error al obtener categorías:", error);
            // Manejar el error según sea necesario
        }
    };

    const handleInputChange = (e) => {
        const file = e.target.files[0]; // Obtener el archivo seleccionado
        setImagen(file); // Almacenar el archivo en el estado
    };

    const submitStore = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData(); // Crear un objeto FormData para enviar datos al backend

            formData.append('nombre', nombre);
            formData.append('precio', precio);
            formData.append('descripcion', descripcion);
            formData.append('categoria_id', categoria_id);
            formData.append('urlfoto', imagen); // Agregar la imagen al FormData

            await Config.getProductoStore(getToken(), formData); // Enviar FormData al backend
            navigate('/usuario/');
        } catch (error) {
            console.error("Error al crear el producto:", error);
            // Manejar el error según sea necesario
        }
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
