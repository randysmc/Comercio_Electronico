import React, { useState, useEffect } from "react";
import SidebarVendedor from "./SidebarVendedor";
import AuthUser from "../pageauth/AuthUser";
import Config from "../Config";

function Transferencia() {
    const { getUser, getToken } = AuthUser();
    const [billetera, setBilletera] = useState([]);
    const [formData, setFormData] = useState({
        id_moneda_aumentar: "",
        id_moneda_disminuir: "",
        cantidad: 0
    });
    const [error, setError] = useState(null);

    useEffect(() => {
        getBilletera();
    }, []);

    const getBilletera = async () => {
        try {
            const response = await Config.getMonedasCartera(getToken());
            const userBilletera = response.data;
            setBilletera(userBilletera);
        } catch (error) {
            console.error("Error al obtener la billetera");
        }
    };

    const handleChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        
        try {
            // Enviar la solicitud con los datos mapeados
            await Config.getManipularMonedas(getToken(), formData);

            // Limpiar el formulario después de la transferencia exitosa
            setFormData({
                id_moneda_aumentar: "",
                id_moneda_disminuir: "",
                cantidad: 0
            });
            
            console.log("Datos enviados:", formData);
            // Actualizar la lista de monedas después de la transferencia
            getBilletera();
        } catch (error) {
            setError(error);
        }
    };

    return (
        <div className="container bg-light" style={{ padding: "20px", borderRadius: "10px", boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)" }}>
            <div className="row">
                <SidebarVendedor />
                <div className="col-sm-9 mt-3 mb-3">
                    <div style={{ marginBottom: "20px" }}>
                        <h2>Billetera de {getUser().name}</h2>
                        <ul style={{ listStyleType: "none", padding: 0 }}>
                            {billetera.map((item) => (
                                <li key={item.id} style={{ marginBottom: "10px", background: "#f9f9f9", padding: "10px", borderRadius: "5px", boxShadow: "0 0 5px rgba(0, 0, 0, 0.1)" }}>
                                    <p><strong>Moneda:</strong> {item.moneda.nombre}</p>
                                    <p><strong>Cantidad:</strong> {item.cantidad}</p>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div style={{ background: "#f0f0f0", padding: "20px", borderRadius: "10px", boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)" }}>
                        <h2 style={{ marginBottom: "20px" }}>Transferencia de Monedas</h2>
                        <form onSubmit={handleSubmit}>
                            <label style={{ marginBottom: "10px", display: "block" }}>
                                Moneda a aumentar:
                                <select name="id_moneda_aumentar" value={formData.id_moneda_aumentar} onChange={handleChange} style={{ marginLeft: "10px" }}>
                                    <option value="">Seleccionar</option>
                                    {billetera.map((item) => (
                                        <option key={item.moneda.id} value={item.moneda.id}>{item.moneda.nombre}</option>
                                    ))}
                                </select>
                            </label>
                            <br />
                            <label style={{ marginBottom: "10px", display: "block" }}>
                                Moneda a disminuir:
                                <select name="id_moneda_disminuir" value={formData.id_moneda_disminuir} onChange={handleChange} style={{ marginLeft: "10px" }}>
                                    <option value="">Seleccionar</option>
                                    {billetera.map((item) => (
                                        <option key={item.moneda.id} value={item.moneda.id}>{item.moneda.nombre}</option>
                                    ))}
                                </select>
                            </label>
                            <br />
                            <label style={{ marginBottom: "10px", display: "block" }}>
                                Cantidad:
                                <input type="number" name="cantidad" value={formData.cantidad} onChange={handleChange} style={{ marginLeft: "10px" }} />
                            </label>
                            <br />
                            <button type="submit" style={{ background: "#007bff", color: "#fff", border: "none", padding: "10px 20px", borderRadius: "5px", cursor: "pointer" }}>Transferir</button>
                        </form>
                        {error && <p style={{ color: "red", marginTop: "10px" }}>Error: {error.message}</p>}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Transferencia;

