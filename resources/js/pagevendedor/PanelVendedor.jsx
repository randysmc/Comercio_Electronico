import React from 'react';
import SidebarVendedor from './SidebarVendedor';

const PanelVendedor = () => {
  return (
    <div className="container py-5" style={{ backgroundColor: '#E5E7EB' }}>
      <div className="row justify-content-center">
        <SidebarVendedor />
        <div className="col-sm-9">
          <div className="bg-white p-4 rounded-lg shadow-md">
            <p className="text-lg text-gray-700 mb-4">Bienvenido a la aplicación de comercio electrónico. Aquí tienes acceso a diversas funciones para administrar tus productos y servicios.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-blue-100 p-4 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Catalogo de Productos</h3>
                <p className="text-gray-700">Busca todos los productos que quieras en nuestro amplio catalogo de productos.</p>
              </div>
              <div className="bg-blue-100 p-4 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Mis Productos</h3>
                <p className="text-gray-700">Observa los productos que has publicado y administra su información.</p>
              </div>
              <div className="bg-blue-100 p-4 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Productos Comprados</h3>
                <p className="text-gray-700">Lleva un control de los productos que has comprado en nuestra plataforma.</p>
              </div>
              <div className="bg-blue-100 p-4 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Catalogo de Servicios</h3>
                <p className="text-gray-700">Ve el catálogo de servicios disponibles, realiza un voluntariado y obten creditos que puedes cambiar por Bitcoins</p>
              </div>
              <div className="bg-blue-100 p-4 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Servicios Solicitados</h3>
                <p className="text-gray-700">Administra los servicios que has publicado, puedes generar más</p>
              </div>
              <div className="bg-blue-100 p-4 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Inbox</h3>
                <p className="text-gray-700">Revisa tus conversaciones con otros usuarios y mantente al tanto de los mensajes importantes.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PanelVendedor;
