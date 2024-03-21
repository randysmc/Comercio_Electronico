import axios from "axios";

const base_api_url = "http://localhost:8000/api/v1";
//Archivo de rutas

export default{
    //AUTH
    getRegister:(data)=>axios.post(`${base_api_url}/auth/register`, data),

    getLogin:(data)=>axios.post(`${base_api_url}/auth/login`, data),
    getLogout: () => axios.post(`${base_api_url}/auth/logout`), // No hay argumentos
    
    getRoles: () => axios.get(`${base_api_url}/roles`),

    //ADMIN

    //User
    getUserAll:()=>axios.get(`${base_api_url}/admin/user`),
    getUserById:(id)=>axios.get(`${base_api_url}/admin/user/${id}`),
    getUserUpdate:(data,id)=>axios.put(`${base_api_url}/admin/user/${id}`, data),

    //Categorias
    getCategoriaAll:()=>axios.get(`${base_api_url}/admin/categoria`),
    getCategoriaStore:(data)=>axios.post(`${base_api_url}/admin/categoria`, data),
    getCategoriaUpdate:(data,id)=>axios.put(`${base_api_url}/admin/categoria/${id}`, data),


    //VENDEDOR
    //Vendedor-Productos
    getProductAll:()=>axios.get(`${base_api_url}/vendedor/producto`),
    getProductosById:(id)=>axios.get(`${base_api_url}/vendedor/producto/${id}`),
    getProductoStore:(data)=>axios.post(`${base_api_url}/vendedor/producto`,data),
    getProductoUpdate:(data)=>axios.put(`${base_api_url}/vendedor/producto/${id}`, data),
    //getProductoDelete:(id)=>axios.delete(`${base_api_url}/vendedor/producto`)

}