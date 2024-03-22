import React, { useEffect, useState } from 'react'
import Config from '../Config';
import Sidebar from './Sidebar';
import { Link } from "react-router-dom";
import AuthUser from '../pageauth/AuthUser';

const CategoriaAll = () => {
    const {getToken} = AuthUser();
    const [categorias, setCategoria] = useState();

    useEffect(()=>{
        getCategoriaAll();
    },[])

    const token = getToken();

    const getCategoriaAll = async() =>{
        const response = await Config.getCategoriaAll(token);
        console.log(response.data)
        setCategoria(response.data)
    };


    return (
        <div className="container bg-light">
            <div className="row">
                <Sidebar />
                <div className="col-sm-9 mt-3 mb-3">
                    <div className="card">
                        <div className="card-body">
                            <Link to={'/admin/categoria/create'} className='btn btn-primary'>Crear Categoria</Link>
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>Id</th>
                                        <th>Name</th> <th>Slug</th><th>Descripción</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {!categorias ? "...loading" : categorias.map(
                                        (categoria) => {
                                              return (
                                                  <tr key ={categoria.id}>
                                                    <td>{categoria.id}</td>
                                                    <td>{categoria.nombre}</td>
                                                    <td>{categoria.slug}</td>
                                                    <td>{categoria.descripcion}</td>
                                                    <td>
                                                        <Link to={ `/admin/categoria/edit/${categoria.id}`} className="btn btn-primary">Editar </Link>
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

export default CategoriaAll