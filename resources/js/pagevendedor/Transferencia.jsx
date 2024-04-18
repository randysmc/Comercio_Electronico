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
        <div className="container bg-light">
            <div className="row">
                <SidebarVendedor />
                <div className="col-sm-9 mt-3 mb-3">
                    <div>
                        <h2>Billetera de {getUser().name}</h2>
                        <ul>
                            {billetera.map((item) => (
                                <li key={item.id}>
                                    <p>Id: {item.moneda.id}</p>
                                    <p>Moneda: {item.moneda.nombre}</p>
                                    <p>Cantidad: {item.cantidad}</p>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <h2>Transferencia de Monedas</h2>
                        <form onSubmit={handleSubmit}>
                            <label>
                                Moneda a aumentar:
                                <select name="id_moneda_aumentar" value={formData.id_moneda_aumentar} onChange={handleChange}>
                                    <option value="">Seleccionar</option>
                                    {billetera.map((item) => (
                                        <option key={item.moneda.id} value={item.moneda.id}>{item.moneda.nombre}</option>
                                    ))}
                                </select>
                            </label>
                            <br />
                            <label>
                                Moneda a disminuir:
                                <select name="id_moneda_disminuir" value={formData.id_moneda_disminuir} onChange={handleChange}>
                                    <option value="">Seleccionar</option>
                                    {billetera.map((item) => (
                                        <option key={item.moneda.id} value={item.moneda.id}>{item.moneda.nombre}</option>
                                    ))}
                                </select>
                            </label>
                            <br />
                            <label>
                                Cantidad:
                                <input type="number" name="cantidad" value={formData.cantidad} onChange={handleChange} />
                            </label>
                            <br />
                            <button type="submit">Transferir</button>
                        </form>
                        {error && <p>Error: {error.message}</p>}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Transferencia;

