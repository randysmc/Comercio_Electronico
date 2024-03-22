import React, { useEffect, useState } from 'react';
import Config from '../Config';
import SidebarVendedor from './SidebarVendedor';
import { Link } from 'react-router-dom';
import AuthUser from '../pageauth/AuthUser';

const ProductosVendedor = () => {
    const { getUser } = AuthUser();
    const user = getUser();
    const [products, setProducts] = useState([]);

    useEffect(() => {
        getProductsByUserId();
    }, []);

    const getProductsByUserId = async () => {
        const response = await Config.getProductAll();
        const userProducts = response.data.filter(product => product.user_id === user.id);

        setProducts(userProducts);
    };

    return (
        <div className="container bg-light">
            <div className="row">
                <SidebarVendedor />
                <div className="col-sm-9 mt-3 mb-3">
                    <div className="card">
                        <div className="card-body">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>Id</th>
                                        <th>Nombre</th>
                                        <th>Descripción</th>
                                        <th>Precio</th>
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
                                                <td>{product.id}</td>
                                                <td>{product.nombre}</td>
                                                <td>{product.descripcion}</td>
                                                <td>{product.precio}</td>
                                                <td>
                                                    <Link to={`/admin/user/edit/${product.id}`} className="btn btn-primary">
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