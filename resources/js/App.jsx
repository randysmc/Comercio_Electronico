import React from "react";
import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
//import '../css/app.css'

const App = () => {
    return (
        <div>
            Bienvenido a la app de comercio electronico
            <button className="btn btn-primary"> Boton </button>
            A ver que pendejada ponemos aqui
            <div>
                Pero ponemos una pendejada mas grande aca
            </div>
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
