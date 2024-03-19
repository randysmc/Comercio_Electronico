import React, { useEffect, useState } from "react";
import Config from "../Config";
import AuthUser from "./AuthUser";
import { useNavigate } from "react-router-dom";



const Register = () => {
    const { getToken } = AuthUser()
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");

    const [selectedRole, setSelectedRole] = useState("");
    const [roles, setRoles] = useState([]);
    
    const navigate = useNavigate();

    useEffect(()=>{
        if(getToken()){
            navigate("/")
        }
    },[])

    //Obtenemos los roles:
    useEffect(() => {
        Config.getRoles()
            .then(response => {
                const rolesArray = Object.entries(response.data).map(([id, name]) => ({ id, name }));
                setRoles(rolesArray);
            })
            .catch(error => {
                console.error("Error al obtener roles:", error);
            });
    }, []);
    


    //Asincrono ya que esperamos una conexion con el servidor
    const submitRegistro = async(e) => {
        e.preventDefault();

        //Validar que se haya seleccionado un rol
        if(!selectedRole){
            alert("por favor seleccione un rol.");
            return;
        }

        const userData = {name, email, password, role: selectedRole};

        // Realizar solicitud de registro
        Config.getRegister(userData)
            .then(({ data }) => {
                //console.log(data);
                if(data.success){
                    navigate("/login")
                }
            })
            .catch(error => {
                console.error("Error al registrar usuario:", error);
                // Manejar el error según sea necesario
            });


        //Traemos la configuracion de Config.jsx

        //Config.getRegister({name, email, password})
        //.then(({data})=>{
        //    console.log(data)
        //})

    }

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-sm-4">
                    <div className="card mt-5 mb-5">
                        <div className="card-body">
                            <h1 className="text-center fw-bolder">Registro</h1>

                            <input type="text" className="form-control mt-3" placeholder='Nombre:' value={name} 
                            onChange={(e)=>setName(e.target.value)} required />

                            <input type="email" className="form-control mt-3" placeholder='Email:' value={email} 
                            onChange={(e)=>setEmail(e.target.value)} required />

                            <input type="password" className="form-control mt-3" placeholder='Contraseña:' value={password} 
                            onChange={(e)=>setPassword(e.target.value)} required />

                            <select className="form-select mt-3" value={selectedRole} onChange={(e) => setSelectedRole(e.target.value)}>
                                <option value="">Seleccione un rol</option>
                                {roles.map(role => (
                                    <option key={role.id} value={role.id}>{role.name}</option>
                                ))}
                            </select>

                            <button onClick={submitRegistro} className="btn btn-primary w-100 mt-3">Guardar</button>
                            <p className="text-center mt-3"><a href="#" className="samll text-decoration-none">Terminos y Condiciones</a></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
