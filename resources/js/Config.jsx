import axios from "axios";

const base_api_url = "http://localhost:8000/api/v1";
//Archivo de rutas

export default{
    //AUTH
    getRegister:(data)=>axios.post(`${base_api_url}/auth/register`, data),

    getLogin:(data)=>axios.post(`${base_api_url}/auth/login`, data),
    getLogout: () => axios.post(`${base_api_url}/auth/logout`), // No hay argumentos
    
 
    getRoles: () => axios.get(`${base_api_url}/roles`)


}