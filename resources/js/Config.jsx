import axios from "axios";

const base_api_url = "http://localhost:8000/api/v1";
//Archivo de rutas

export default{
    //AUTH
    getRegister:(data)=>axios.post(`${base_api_url}/auth/register`, data),

    getRoles: () => axios.get(`${base_api_url}/roles`)


}