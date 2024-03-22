import React, { useEffect, useState } from "react";
import Config from "../Config";
import AuthUser from "./AuthUser";
import { useNavigate } from "react-router-dom";

const Register = () => {
    const { getToken } = AuthUser()
    const [name, setName] = useState("");
    const [lastname, setLastname] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [fechaNacimiento, setFechaNacimiento] = useState(""); // Agregado
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
            alert("Por favor seleccione un rol.");
            return;
        }

        const userData = {name, lastname, username, email, password, fecha_nacimiento: fechaNacimiento, role: selectedRole}; // Actualizado

        // Realizar solicitud de registro
        Config.getRegister(userData)
            .then(({ data }) => {
                if(data.success){
                    navigate("/login")
                }
            })
            .catch(error => {
                console.error("Error al registrar usuario:", error);
                // Manejar el error según sea necesario
            });
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

                            <input type="text" className="form-control mt-3" placeholder='Apellido:' value={lastname} 
                            onChange={(e)=>setLastname(e.target.value)} required /> {/* Agregado */}

                            <input type="text" className="form-control mt-3" placeholder='Nombre de usuario:' value={username} 
                            onChange={(e)=>setUsername(e.target.value)} required /> {/* Agregado */}

                            <input type="email" className="form-control mt-3" placeholder='Email:' value={email} 
                            onChange={(e)=>setEmail(e.target.value)} required />

                            <input type="password" className="form-control mt-3" placeholder='Contraseña:' value={password} 
                            onChange={(e)=>setPassword(e.target.value)} required />

                            <input type="date" className="form-control mt-3" placeholder='Fecha de nacimiento:' value={fechaNacimiento} 
                            onChange={(e)=>setFechaNacimiento(e.target.value)} required /> {/* Agregado */}

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
