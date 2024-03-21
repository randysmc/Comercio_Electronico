import React from 'react'
import SidebarVendedor from './SidebarVendedor';




const PanelVendedor = () => {
  return (
    <div className="container bg-light">
        <div className="row justify-content-center mt-5 mb-5">
            <SidebarVendedor/>
            <div className="col-sm-9">
                <h1 className="text-center"> Vendedor </h1>
            </div>
        </div>
    </div>
);
}

export default PanelVendedor