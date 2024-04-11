import React, { useEffect, useState } from 'react';
import AuthUser from '../pageauth/AuthUser';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Config from '../Config';

const ProductoSeleccionado = () => {
  const { getToken, getUser } = AuthUser();
  const { id } = useParams();
  const [productData, setProductData] = useState({
    id: '', // Agrega id al estado inicial
    nombre: '',
    descripcion: '',
    precio: '',
    moneda_id: '',
    urlfoto: '',
    user_id: '',
  });
  const comprador = getUser();

  useEffect(() => {
    const getProductById = async () => {
      try {
        const response = await Config.getProductById(getToken(), id);
        const { nombre, descripcion, precio, moneda_id, urlfoto, user_id } = response.data;
        // Asigna el ID del producto recuperado del useParams
        setProductData({ id, nombre, descripcion, precio, moneda_id, urlfoto, user_id });
      } catch (error) {
        console.error("Error al obtener Producto", error);
      }
    };
    getProductById();
  }, [id]); // Asegúrate de incluir id en la lista de dependencias

  return (
    <div className="container bg-light">
      <div className="row justify-content-center mt-5">
        <div className="col-md-6">
          <div className="card">
            <img src={productData.urlfoto} className="card-img-top" alt={productData.nombre} />
            <div className="card-body">
              <h5 className="card-title">{productData.nombre}</h5>
              <p className="card-text">{productData.descripcion}</p>
              <p className="card-text">Precio: {productData.precio} {productData.moneda_id}</p>
              <p className='card-text'>Usuario Vendedor: {productData.user_id}</p>
              <p>Comprador: {comprador.id}</p>
            </div>
          </div>
          <Link to='/usuario/producto' className='btn btn-secondary'>Regresar</Link>
          <Link to={`/usuario/producto/compra?precio=${productData.precio}&user_id_vendedor=${productData.user_id}&user_id_comprador=${comprador.id}&id_producto=${productData.id}`} className='btn btn-primary'>Comprar</Link>
        </div>
      </div>
    </div>
  );
};

export default ProductoSeleccionado;