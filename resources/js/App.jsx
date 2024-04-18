import React from "react";
import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";

import LayoutPublic from "./layouts/LayoutPublic";
import LayoutAdmin from "./layouts/LayoutAdmin";
import LayoutVendedor from "./layouts/LayoutVendedor";


import PageHome from "./pagepublic/PageHome";
import About from "./pagepublic/About";
import ProtectedRoutes from "./pageauth/ProtectedRoutes";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from "./pageauth/Login";
import Register from "./pageauth/Register";




import {PanelAdmin, CategoriaAll, CategoriaStore, UserAll, UserUpdate, TransaccionAll, ProductosNoAprobados, ProductUpdate, Ventas, Voluntariados } from "./pageadmin";

import {PanelVendedor, PerfilVendedor, 
        TodosLosProductos, MisProductos, ProducStore, ProductoSeleccionado, CompraProducto, ProductosComprados, ProductoUpdate,
        TodosLosServicios, MisServicios, ServicioStore, ServicioSeleccionado, Voluntariado,
        InboxAll, InboxStore} from "./pagevendedor"

import ProductosAll from "./pageadmin/ProductosAll";
import ProductStore from "./pagevendedor/ProductStore";

import ServiciosAll from "./pageadmin/ServiciosAll";

//import '../css/app.css'

const App = () => {
    return (
        <div>
            
            <Router>
                <Routes>
                    <Route path="/" element={<LayoutPublic />}>
                        <Route index element={<PageHome />} />
                        <Route path="/about" element = {<About />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                    </Route>

                    <Route element={<ProtectedRoutes />}>
                        <Route path="/admin" element={<LayoutAdmin />}>
                            <Route index element={<PanelAdmin/>} />
                            <Route path="user" element={<UserAll />}></Route>
                            <Route path="user/edit/:id" element={<UserUpdate />}></Route>

                            <Route path="categoria" element={<CategoriaAll />}></Route>
                            <Route path="categoria/create" element={<CategoriaStore/>}></Route>
                            <Route path="producto" element={<ProductosAll />}></Route>
                            <Route path="producto/edit/:id" element={<ProductUpdate />}></Route>
                            <Route path="producto/create" element={<ProductStore/>}></Route>
                            <Route path="producto-no-aprobado" element={<ProductosNoAprobados/>}></Route>

                            <Route path="servicio" element={<ServiciosAll />}></Route>
                            <Route path="reportes" element={<TransaccionAll />}></Route>
                            <Route path="ventas" element={<Ventas />}></Route>
                            <Route path="voluntariados" element={<Voluntariados />}></Route>

                            
                            
                        </Route>

                        <Route path="/usuario" element={<LayoutVendedor />}>
                            <Route index element={< PanelVendedor/>} />
                            <Route path="profile" element={<PerfilVendedor/>}/>

                            <Route path="producto" element={<TodosLosProductos/>}></Route>
                            <Route path="producto/edit/:id" element={<ProductoUpdate />}></Route>

                            <Route path="mis-productos" element={<MisProductos/>}></Route>
                            <Route path="producto/create" element={<ProducStore/>}></Route>
                            <Route path="producto/info/:id" element={<ProductoSeleccionado/>}> </Route>
                            <Route path="producto/compra" element={<CompraProducto/>}></Route>
                            <Route path="producto-compra" element={<ProductosComprados/>}></Route>
                            

                            <Route path="servicio" element={<TodosLosServicios/>}></Route>
                            <Route path="mis-servicios" element={<MisServicios/>}></Route>
                            <Route path="servicio/create" element={<ServicioStore/>}></Route> 
                            <Route path="servicio/info/:id" element={<ServicioSeleccionado/>}></Route>
                            <Route path="servicio/trueque" element={<Voluntariado/>}></Route>       

                            <Route path="inbox" element={<InboxAll/>}></Route>
                            <Route path="inbox/create" element={<InboxStore/>}></Route>

                            
                        </Route>
                    </Route>
                </Routes>
            </Router>
        </div>
    );
};

export default App;

if (document.getElementById("root")) {
    const Index = ReactDOM.createRoot(document.getElementById("root"));

    Index.render(

            <App />

    );
}
