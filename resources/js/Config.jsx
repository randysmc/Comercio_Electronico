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
    getLogin: (data, token) => axios.post(`${base_api_url}/auth/login`, data),
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
    getAdminProductAll: (token) => axiosWithAuth(token).get('/admin/producto'),

    getAdminServiciosAll: (token) => axiosWithAuth(token).get('/admin/servicio'),

    // USER

    //User-usuario
    //getUsuarioById: (token, id) => axiosWithAuth(token).get(`/usuario/user/${id}`),
    getUsuario:(token)=>axiosWithAuth(token).get(`usuario/user`),
    getUsuarioCartera: (token) => axiosWithAuth(token).get(`/usuario/user/cartera`),
    getUsuarioUpdate: (token, data, id) => axiosWithAuth(token).get(`/usuario/user/${id}`, data),

    // User-Productos
    getProductAll: (token) => axiosWithAuth(token).get('/usuario/producto'),
    getUserProductAll: (token) => axiosWithAuth(token).get('/usuario/productos'),
    
    getProductById: (token, id) => axiosWithAuth(token).get(`/usuario/producto/${id}`),
    getProductoStore: (token, data) => axiosWithAuth(token).post('/usuario/producto', data),
    getProductoUpdate: (token, data, id) => axiosWithAuth(token).put(`/usuario/producto/${id}`, data),
    getProductoComprado: (token) => axiosWithAuth(token).get('/usuario/producto-compra'),

    //User-Categoria
    getVendedorCategoriaAll:(token) => axiosWithAuth(token).get('usuario/categoria'),

    getTransaccionStore:(token, data) => axiosWithAuth(token).post('/usuario/transaccion', data),
    
    //User-Servicios
    getServicioAll: (token) => axiosWithAuth(token).get(`/usuario/servicio`),
    getUserServiceAll: (token)=> axiosWithAuth(token).get(`/usuario/servicios`),
    
    getServicioById: (token, id) => axiosWithAuth(token).get(`/usuario/servicio/${id}`),
    getServicioStore:(token, data) => axiosWithAuth(token).post(`/usuario/servicio`,data),
    getServicioUpdate:(token, data, id) =>axiosWithAuth(token).put(`/usuario/servicio/${id}`,data),

    //User-Cartera


};
