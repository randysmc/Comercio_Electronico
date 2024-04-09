import React, { useEffect, useState } from 'react';
import Config from '../Config';
import SidebarVendedor from './SidebarVendedor';
import { Link } from 'react-router-dom';
import AuthUser from '../pageauth/AuthUser';

const ProductosVendedor = () => {
    const { getUser, getToken } = AuthUser();
    const [products, setProducts] = useState([]);
    const [categorias, setCategorias] = useState([]);
    const [categoriasCargadas, setCategoriasCargadas] = useState(false);
    const [filter, setFilter] = useState({
        category: '',
        name: ''
    });

    useEffect(() => {
        getProducts();
        obtenerCategorias();
    }, []);

    const getProducts = async () => {
        const response = await Config.getProductAll(getToken());
        const userProducts = response.data;
        setProducts(userProducts);
    };

    const obtenerCategorias = async () => {
        try {
            const response = await Config.getVendedorCategoriaAll(getToken());
            setCategorias(response.data);
            setCategoriasCargadas(true);
        } catch (error) {
            console.error("Error al obtener categorías:", error);
            // Manejar el error según sea necesario
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFilter({
            ...filter,
            [name]: value
        });
    };

    const filteredProducts = products.filter((product) => {
        return (
            (!filter.category || product.categoria === filter.category) &&
            (!filter.name || product.nombre.toLowerCase().includes(filter.name.toLowerCase()))
        );
    });

    const productsToDisplay = filter.category || filter.name ? filteredProducts : products;

    return (
        <div className="container bg-light">
            <div className="row">
                <SidebarVendedor />
                <div className="col-sm-9 mt-3 mb-3">
                    <div className="card">
                        <div className="card-body">
                            <div className="mb-3">
                                <label htmlFor="category">Categoría:</label>
                                <select
                                    id="category"
                                    name="category"
                                    className="form-control"
                                    value={filter.category}
                                    onChange={handleInputChange}
                                >
                                    <option value="">Todas</option>
                                    {categoriasCargadas && categorias.map((categoria) => (
                                        <option key={categoria.id} value={categoria.id}>
                                            {categoria.nombre}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="name">Nombre:</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    className="form-control"
                                    value={filter.name}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="row row-cols-1 row-cols-md-3 g-4">
                                {productsToDisplay.map((product) => (
                                    <div className="col" key={product.id}>
                                        <div className="card h-100">
                                            <img src={product.urlfoto} className="card-img-top" alt={product.nombre} />
                                            <div className="card-body">
                                                <h5 className="card-title">{product.nombre}</h5>
                                                <p className="card-text">{product.descripcion}</p>
                                                <p className="card-text">Precio: {product.precio} {product.moneda ? product.moneda.nombre : ''}</p>
                                                <Link to={`/vendedor/producto/edit/${product.id}`} className="btn btn-primary">
                                                    Editar
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductosVendedor;
