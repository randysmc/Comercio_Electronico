import React, { useEffect, useState } from 'react';
import SidebarComprador from './SidebarComprador';
import AuthUser from '../pageauth/AuthUser';
import Config from '../Config';
import { Link } from 'react-router-dom';

const ProductosComprador = () => {
  const { getToken } = AuthUser();
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    getProductsAll();
  }, []);

  const getProductsAll = async () => {
    const token = getToken();
    if (!token) {
      console.log("Token no encontrado");
      return;
    }

    try {
      const response = await Config.getCompradorProductosAll(token);
      setProducts(response.data);
    } catch (error) {
      console.error("Error al obtener productos:", error);
    }
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredProducts = products.filter((product) => {
    return product.nombre.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <div className="container bg-light">
      <div className="row">
        <SidebarComprador />
        <div className="col-sm-9 mt-3 mb-3">
          <div className="row">
            <div className="col">
              <input
                type="text"
                className="form-control"
                placeholder="Buscar producto por nombre..."
                value={searchTerm}
                onChange={handleSearchChange}
              />
            </div>
          </div>
          <div className="row row-cols-1 row-cols-md-3 g-4">
            {!filteredProducts.length ? (
              <div className="col">No se encontraron productos.</div>
            ) : (
              filteredProducts.map((product) => (
                <div key={product.id} className="col">
                  <div className="card h-100">
                    <div className="card-body">
                      <h5 className="card-title">{product.nombre}</h5>
                      <p className="card-text">{product.descripcion}</p>
                      <p className="card-text">Precio: ${product.precio}</p>

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
};

export default ProductosComprador;
