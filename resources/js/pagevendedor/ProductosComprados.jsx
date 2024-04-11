import React, { useEffect, useState } from 'react';
import Config from '../Config';
import SidebarVendedor from './SidebarVendedor';
import { Link } from 'react-router-dom';
import AuthUser from '../pageauth/AuthUser';

const ProductosComprados = () => {
    const { getUser, getToken } = AuthUser();
    const user = getUser();
    const [products, setProducts] = useState([]);

    useEffect(() => {
        getProducts();
    }, []);

    const getProducts = async () => {
        const response = await Config.getProductoComprado(getToken());
        const userProducts = response.data;

        setProducts(userProducts);
    };

    return (
        <div className="container bg-light">
            <div className="row">
                <SidebarVendedor />
                <div className="col-sm-9 mt-3 mb-3">
                    <div className="row row-cols-1 row-cols-md-2 g-4">
                        {!products ? (
                            <div className="col">
                                Cargando...
                            </div>
                        ) : (
                            products.map((product) => (
                                <div key={product.id} className="col">
                                    <div className="card">
                                        <img src={product.urlfoto} className="card-img-top" alt={product.nombre} />
                                        <div className="card-body">
                                            <h5 className="card-title">{product.nombre}</h5>
                                            <p className="card-text">{product.descripcion}</p>
                                            <p className="card-text">Precio: {product.precio} {product.moneda ? product.moneda.nombre : ''}</p>
                                            <Link to={`/vendedor/producto/edit/${product.id}`} className="btn btn-primary"></Link>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
    
}

export default ProductosComprados