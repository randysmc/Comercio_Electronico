import React from "react";
import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";

import LayoutPublic from "./layouts/LayoutPublic";
import LayoutAdmin from "./layouts/LayoutAdmin";
import LayoutComprador from "./layouts/LayoutComprador";
import LayoutVendedor from "./layouts/LayoutVendedor";
import LayoutVisitante from "./layouts/LayoutVisitante";

import PageHome from "./pagepublic/PageHome";
import Panel from "./pageadmin/PanelAdmin"
import ProtectedRoutes from "./pageauth/ProtectedRoutes";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from "./pageauth/Login";
import Register from "./pageauth/Register";
import PanelAdmin from "./pageadmin/PanelAdmin";
import PanelComprador from "./pagecomprador/PanelComprador";
import PanelVendedor from "./pagevendedor/PanelVendedor";
import PanelVisitante from "./pagevisitante/PanelVisitante";
//import '../css/app.css'

const App = () => {
    return (
        <div>
            <Router>
                <Routes>
                    <Route path="/" element={<LayoutPublic />}>
                        <Route index element={<PageHome />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                    </Route>

                    <Route element={<ProtectedRoutes />}>
                        <Route path="/admin" element={<LayoutAdmin />}>
                            <Route index element={<PanelAdmin/>} />
                        </Route>

                        <Route path="/vendedor" element={<LayoutVendedor />}>
                            <Route index element={< PanelVendedor/>} />
                        </Route>

                        <Route path="/comprador" element={<LayoutComprador />}>
                            <Route index element={<PanelComprador />} />
                        </Route>

                        <Route path="/visitante" element={<LayoutVisitante />}>
                            <Route index element={<PanelVisitante />} />
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
        <React.StrictMode>
            <App />
        </React.StrictMode>
    );
}
