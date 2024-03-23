import React, { useEffect, useState } from 'react';
import Config from '../Config';
import Sidebar from "./Sidebar";
import { Link } from 'react-router-dom';
import AuthUser from '../pageauth/AuthUser';

const ProductosVendedor = () => {
    const { getUser, getToken } = AuthUser();
    //const user = getUser();
    const [products, setProducts] = useState([]);

    useEffect(() =>{
        getAllProducts();
    },[]);

    const getAllProducts = async() =>{
        const response = await Config.getAdminProductAll(getToken());
        //console.log(response.data)
        const userProducts = response.data;

        setProducts(userProducts);
    }



    return (
        <div className="container bg-light">
            <div className="row">
                <Sidebar/>
                <div className="col-sm-9 mt-3 mb-3">
                    <div className="card">
                        <div className="card-body">
                        <Link to={'/vendedor/producto/create'} className='btn btn-primary'>Postear Producto</Link>
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>Vendedor</th>
                                        <th>Categoria</th>
                                        <th>Producto</th>
                                        <th>Descripción</th>
                                        <th>Precio</th>
                                        <th>Estado?</th>
                                        <th>Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {!products ? (
                                        <tr>
                                            <td colSpan="5">Cargando...</td>
                                        </tr>
                                    ) : (
                                        products.map((product) => (
                                            <tr key={product.id}>
                                                <td>{product.user.name}</td>
                                                <td>{product.categoria.nombre}</td>
                                                <td>{product.nombre}</td>
                                                <td>{product.descripcion}</td>
                                                <td>{product.precio}</td>
                                                <td>{product.publicado ? 'Aprobado' : 'No aprobado'}</td>
                                                <td>
                                                    <Link to={`/admin/producto/edit/${product.id}`} className="btn btn-primary">
                                                        Editar
                                                    </Link>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};


export default ProductosVendedor;
