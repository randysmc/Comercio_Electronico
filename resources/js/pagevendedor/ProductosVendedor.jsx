import React, { useEffect, useState } from 'react'
import Config from '../Config';
import SidebarVendedor from './SidebarVendedor';
import { Link } from 'react-router-dom';

const ProductosVendedor = () => {

  const [products, setProducts] = useState();

  useEffect(() => {
    getProducstAll();
  }, []);

  const getProducstAll = async() => {
    const response = await Config.getProductAll();
    console.log(response.data);
    setProducts(response.data);

  }
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
                                    <th>Name</th> <th>Email</th><th>Tipo de usuario</th>
                                </tr>
                            </thead>
                            <tbody>
                                {!products ? "...loading" : products.map(
                                    (product) => {
                                          return (
                                              <tr key ={product.id}>
                                                <td>{product.id}</td>
                                                <td>{product.name}</td>
                                                <td>{product.descripcion}</td>
                                                <td>{product.precio}</td>
                                                <td>
                                                    <Link to={ `/admin/user/edit/${product.id}`} className="btn btn-primary">Editar </Link>
                                                </td>
                                                

                                              </tr>
                                          );
                                      })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
);
}

export default ProductosVendedor