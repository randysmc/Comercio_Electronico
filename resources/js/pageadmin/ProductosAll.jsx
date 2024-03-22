import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AuthUser from '../pageauth/AuthUser';
import Config from '../Config';
import Sidebar from './Sidebar';


const ProductosAll = () => {
    const { getUser } = AuthUser();
    const user = getUser();
    const [products, setProducts] = useState();

    useEffect(() => {
        getProductsAll();
    }, []);

    const getProductsAll = async () => {
        try {
            const response = await Config.getProductAll();
            setProducts(response.data);
        } catch (error) {
            console.error("Error al obtener productos:", error);
        }
    };

    return (
        <div className="container bg-light">
            <div className="row">
                {/* Asumiendo que SidebarVendedor está definido */}
                <Sidebar />
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
                                                <td>{product.name}</td>
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
}

export default ProductosAll;
