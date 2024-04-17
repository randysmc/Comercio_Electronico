import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Config from '../Config';
import AuthUser from '../pageauth/AuthUser';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';

const ProductoSeleccionado = () => {
  const { getToken, getUser } = AuthUser();
  const { id } = useParams();
  const [producto, setProducto] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const comprador = getUser();
  const navigate = useNavigate();

  useEffect(() => {
    const getProductoById = async () => {
      try {
        const response = await Config.getProductById(getToken(), id);
        const productoData = response.data;
        setProducto(productoData);
      } catch (error) {
        console.error("Error al obtener detalles del producto", error);
      }
    };
    getProductoById();
  }, [id]); // Asegúrate de incluir id en la lista de dependencias

  // Función para manejar la acción de realizar la compra
  const handleRealizarCompra = () => {
    // Aquí puedes enviar la petición POST para realizar la compra
    const data = {
      user_id_vendedor: producto.user_id,
      id_producto: producto.id,
      dinero: producto.precio,
      user_id_comprador: comprador.id
    }

    Config.getTransaccionStore(getToken(), data)
      .then(response => {
        console.log("Transaccion realizada con exito", response.data);
        setShowModal(false);
        navigate('/usuario', {state:{successMessage: "Transaccion realizada con exito"}});
      })
      .catch(error => {
        console.error("Error al realizar la transaccion", error);
      })
  };

  // Renderizar mensaje mientras se carga el producto
  if (!producto) {
    return <div>Cargando producto...</div>;
  }

  return (
    <div className="container bg-light">
      <div className="row justify-content-center mt-5">
        <div className="col-md-6">
          <div className="card">
            <img src={producto.urlfoto} className="card-img-top" alt={producto.nombre} />
            <div className="card-body">
              <h5 className="card-title">{producto.nombre}</h5>
              <p className="card-text">{producto.descripcion}</p>
              <p className="card-text">Precio: {producto.precio} {producto.moneda.nombre}</p>
            </div>
          </div>
          <Link to='/usuario/producto' className='btn btn-secondary'>Regresar</Link>
          <Button variant="primary" onClick={() => setShowModal(true)}>Comprar</Button>
        </div>
      </div>

      {/* Modal para confirmar la compra */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmar Compra</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Estás a punto de realizar una compra con los siguientes detalles:</p>
          <p>Usuario vendedor: {producto.user.name}</p>
          <p>Nombre del producto: {producto.nombre}</p>
          <p>Precio del producto: {producto.precio} Bitcoin</p>
          <p>¿Deseas proceder con la compra?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>Cancelar</Button>
          <Button variant="primary" onClick={handleRealizarCompra}>Aceptar</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ProductoSeleccionado;
