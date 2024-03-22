import axios from "axios";

const base_api_url = "http://localhost:8000/api/v1";

const axiosWithAuth = (token) => {
    return axios.create({
        baseURL: base_api_url,
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
};

export default {
    // AUTH
    getRegister: (data) => axios.post(`${base_api_url}/auth/register`, data),
    getLogin: (data, token) => axios.post(`${base_api_url}/auth/login`, data, { headers: { 'Authorization': `Bearer ${token}` } }),
    getLogout: (token) => axios.post(`${base_api_url}/auth/logout`, null, { headers: { 'Authorization': `Bearer ${token}` } }),
    getRoles: () => axios.get(`${base_api_url}/roles`),

    // ADMIN
    // User
    getUserAll: (token) => axiosWithAuth(token).get('/admin/user'),
    getUserById: (token, id) => axiosWithAuth(token).get(`/admin/user/${id}`),
    getUserUpdate: (token, data, id) => axiosWithAuth(token).put(`/admin/user/${id}`, data),

    // Categorias
    getCategoriaAll: (token) => axiosWithAuth(token).get('/admin/categoria'),
    getCategoriaStore: (token, data) => axiosWithAuth(token).post('/admin/categoria', data),
    getCategoriaUpdate: (token, data, id) => axiosWithAuth(token).put(`/admin/categoria/${id}`, data),

    // VENDEDOR

    // Vendedor-Productos
    getProductAll: (token) => axiosWithAuth(token).get('/vendedor/producto'),
    getProductById: (token, id) => axiosWithAuth(token).get(`/vendedor/producto/${id}`),
    getProductoStore: (token, data) => axiosWithAuth(token).post('/vendedor/producto', data),
    getProductoUpdate: (token, data, id) => axiosWithAuth(token).put(`/vendedor/producto/${id}`, data),

    //Vendedor-Categoria
    getVendedorCategoriaAll:(token) => axiosWithAuth(token).get('vendedor/categoria'),
};
