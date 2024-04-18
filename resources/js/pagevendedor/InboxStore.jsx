import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Config from '../Config';
import SidebarVendedor from './SidebarVendedor';
import AuthUser from '../pageauth/AuthUser';

const InboxStore = () => {
  const { getUser, getToken } = AuthUser();
  const user = getUser();

  const [contenido, setContenido] = useState('');
  const [destinatarioId, setDestinatarioId] = useState('');
  const [usuarios, setUsuarios] = useState([]);
  const [enviando, setEnviando] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const obtenerUsuarios = async () => {
      try {
        const token = getToken();
        const response = await Config.getUserAll(token);

        setUsuarios(response.data);
      } catch (error) {
        console.error("Error al obtener la lista de usuarios:", error);
      }
    };

    obtenerUsuarios(); // Llamamos a la función directamente

    // No incluimos getToken() como dependencia
  }, []); // Sin dependencias, se ejecuta solo una vez al montar el componente

  const handleChangeContenido = (event) => {
    setContenido(event.target.value);
  };

  const handleChangeDestinatario = (event) => {
    setDestinatarioId(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const token = getToken();
      // Enviar la solicitud con el ID del destinatario
      await Config.getInboxStore(token, {
        contenido,
        user_id_destinatario: destinatarioId
      });
      // Limpiar los campos después de enviar el mensaje
      setContenido('');
      setDestinatarioId('');
    } catch (error) {
      // No hacer nada en caso de error
    }
  };

  return (
    <div className='container bg-light'>
      <div className='row'>
        <SidebarVendedor />
        <div className='col-sm-9 mt-3 mb-3'>
          <h2>Enviar Mensaje</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="contenido" className="form-label">Contenido del mensaje</label>
              <textarea
                id="contenido"
                className="form-control"
                value={contenido}
                onChange={handleChangeContenido}
                required
              ></textarea>
            </div>
            <div className="mb-3">
              <label htmlFor="destinatario" className="form-label">Destinatario</label>
              <select
                id="destinatario"
                className="form-select"
                value={destinatarioId}
                onChange={handleChangeDestinatario}
                required
              >
                <option value="">Seleccionar destinatario</option>
                {usuarios.map(usuario => (
                  <option key={usuario.id} value={usuario.id}>{usuario.name}</option>
                ))}
              </select>
            </div>
            <button type="submit" className="btn btn-primary" disabled={enviando}>Enviar</button>
            {error && <div className="text-danger">{error}</div>}
          </form>
          <Link to="/usuario/inbox" className="btn btn-secondary mt-3">Regresar a la Bandeja de Entrada</Link>
        </div>
      </div>
    </div>
  );
}

export default InboxStore;
