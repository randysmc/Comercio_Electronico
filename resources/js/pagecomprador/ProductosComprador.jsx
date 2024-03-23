import React, { useEffect, useState } from 'react';
import AuthUser from '../pageauth/AuthUser';
import Config from '../Config';
import SidebarComprador from './PanelComprador';
import { Link } from 'react-router-dom';

const ProductosComprador = () => {
  const { getToken } = AuthUser();
  const [products, setProducts] = useState(); // Corregir aquí

  useEffect(() => {
    getProductsAll();
  }, []);

  const getProductsAll = async () => {
    const token = getToken();
    if (!token) {
      // Manejar el caso en que el token no esté presente
      console.log("Token no encontrado");
      return;
    }

    try {
      const response = await Config.getCompradorProductosAll(token);
      console.log(response.data);
      setProducts(response.data);
    } catch (error) {
      console.error("Error al obtener productos:", error);
    }
  };

  return (
    <div className="container bg-light">
      <div className="row">
        <SidebarComprador />
        <div className="col-sm-9 mt-3 mb-3">
          <div className="card">
            <div className="card-body">
              <table className="table">
                <thead>
                  <tr>
                    <th>Nombre</th>
                    <th>Descripcion</th>
                    <th>Precio</th>
                  </tr>
                </thead>
                <tbody>
                  {!products ? (
                    <tr>
                      <td colSpan="5">Cargando...</td> {/* Aquí movemos el texto dentro de una celda de la tabla */}
                    </tr>
                  ) : (
                    products.map((product) => (
                      <tr key={product.id}>
                        <td>{product.nombre}</td>
                        <td>{product.descripcion}</td>
                        <td>{product.precio}</td>
                        <td>
                          <Link
                            to={`/admin/user/edit/${product.id}`}
                            className="btn btn-primary"
                          >
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

export default ProductosComprador;
