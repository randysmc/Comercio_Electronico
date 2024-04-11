import React, { useEffect, useState } from 'react';
import Config from '../Config';
import { Link, useNavigate, useParams } from 'react-router-dom';
import SidebarVendedor from './SidebarVendedor';
import AuthUser from '../pageauth/AuthUser';

const ProductoUpdate = () => {
    const { getToken } = AuthUser();
    const navigate = useNavigate();
    const { id } = useParams();
    const [productData, setProductData] = useState({
        nombre: '',
        descripcion: '',
        precio: '',
        disponible: true // Inicializado como true
    });

    useEffect(() => {
        const getProductById = async () => {
            try {
                const response = await Config.getProductById(getToken(), id);
                const { nombre, descripcion, precio, disponible } = response.data;
                setProductData({ nombre, descripcion, precio, disponible });
            } catch (error) {
                console.error("Error al obtener producto:", error);
            }
        };
        getProductById();
    }, [id]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProductData(prevState => ({ ...prevState, [name]: value }));
    };

    const handleToggleDisponible = () => {
        setProductData(prevState => ({ ...prevState, disponible: !prevState.disponible }));
    };

    const submitUpdate = async (e) => {
        e.preventDefault();
        try {
            const data = { 
                nombre: productData.nombre, 
                descripcion: productData.descripcion, 
                precio: productData.precio, 
                disponible: productData.disponible ? 1 : 0 
            };
            await Config.updateProduct(getToken(), data, id);
            navigate('/usuario/mis-productos');
        } catch (error) {
            console.error("Error al actualizar producto:", error);
        }
    };

    return (
        <div className='container bg-light'>
            <div className='row'>
                <SidebarVendedor />
                <div className='col-sm-9 mt-3 mb-3'>
                    <div className='card'>
                        <div className='card-header'>Editar Producto</div>
                        <div className='card-body'>
                            <form onSubmit={submitUpdate}>
                                <div className='mb-3'>
                                    <label htmlFor='nombre' className='form-label'>Nombre</label>
                                    <input type='text' className='form-control' id='nombre' name='nombre' value={productData.nombre} onChange={handleInputChange} />
                                </div>
                                <div className='mb-3'>
                                    <label htmlFor='precio' className='form-label'>Precio</label>
                                    <input type='text' className='form-control' id='precio' name='precio' value={productData.precio} onChange={handleInputChange} />
                                </div>
                                <div className='mb-3'>
                                    <label htmlFor='descripcion' className='form-label'>Descripción</label>
                                    <textarea className='form-control' id='descripcion' name='descripcion' value={productData.descripcion} onChange={handleInputChange} />
                                </div>
                                <div className='form-check form-switch mb-3'>
                                    <input className='form-check-input' type='checkbox' id='disponible' name='disponible' checked={productData.disponible} onChange={handleToggleDisponible} />
                                    <label className='form-check-label' htmlFor='disponible'>Disponible</label>
                                </div>
                                <div className='btn-group mt-3'>
                                    <Link to='/usuario/mis-productos' className='btn btn-secondary'>Regresar</Link>
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

export default ProductoUpdate;
