import React, { useEffect, useState } from 'react'
import AuthUser from '../pageauth/AuthUser'
import Config from '../Config';
import SidebarVendedor from './SidebarVendedor';
import { Link, useNavigate } from 'react-router-dom';

const ServicioStore = () => {
  const {getUser, getToken} = AuthUser();
  console.log(getUser())

  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [precio, setPrecio] = useState('');
  const [urlfoto, setUrlfoto] = useState('');
  const [categoria_id, setCategoriaId] = useState('');
  const [categorias, setCategorias] = useState([]);
  const [categoriasCargadas, setCategoriasCargadas] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const files = e.target.files;
    const reader = new FileReader();
    ReadableStream.readAsDataUrl(files[0]);
    reader.onload = (e) => {
      setUrlfoto(e.target.result);
    }
  }

  const submitStore = async (e) => {
    e.preventDefault();
    try{
      await Config.getServicioStore(getToken(), {nombre, precio, descripcion, urlfoto});
      navigate('vendedor/servicio');
    } catch(error){
      console.error('Error al crear el producto', error);
    }
  }

  
  return (
    
    <div className='container bg-light'>
        <div className='row'>
            <SidebarVendedor />
            <div className='col-sm-9 mt-3 mb-3'>
                <div className='card'>
                    <div className='card-body'>
                        <form onSubmit={submitStore}>
                            <div className='form-group row'>
                                <div className='col-sm-8'>
                                    <label>Nombre del Servicio</label>
                                    <input className='form-control' value={nombre} onChange={(e) => setNombre(e.target.value)} type='text'></input>
                                </div>
                                <div className='col-sm-4'>
                                    <label>Pago</label>
                                    <input className='form-control' value={precio} onChange={(e) => setPrecio(e.target.value)} type='number'></input>
                                </div>
                            </div>
                            <div className='mt-3'>
                                <label>Descripción:</label>
                                <textarea className='form-control' value={descripcion} onChange={(e) => setDescripcion(e.target.value)} />
                            </div>
                            <div className='mt-3'>
                                <label>Imagen</label>
                                <input className='form-control' type='file' onChange={(e) => handleInputChange(e)} />
                            </div>
                            <div className='btn-group mt-3'>
                                <Link to={-1} className='btn btn-secondary'> Regresar </Link>
                                <button type='submit' className='btn btn-primary'>Crear Publicación </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
);
}

export default ServicioStore