import React from 'react';

const About = () => {
  return (
    <div className="bg-blue-200 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-semibold text-center mb-4">Acerca de la Aplicación</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold mb-4">Conexión de Compradores y Vendedores</h3>
              <p className="text-gray-800 leading-relaxed">
                La aplicación de comercio electrónico es una plataforma innovadora que conecta a compradores y vendedores, ofreciendo una experiencia de compra y venta intuitiva y segura.
              </p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold mb-4">Economía Colaborativa</h3>
              <p className="text-gray-800 leading-relaxed">
                Con un enfoque en la economía colaborativa, nuestra plataforma promueve el intercambio equitativo y sostenible de recursos, fomentando la participación activa de los usuarios en la creación de valor y la generación de riqueza.
              </p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold mb-4">Innovación Continua</h3>
              <p className="text-gray-800 leading-relaxed">
                Estamos comprometidos con la innovación continua y la mejora de nuestra plataforma para satisfacer las necesidades cambiantes de nuestros usuarios. ¡Únete a nosotros en esta emocionante aventura y descubre un nuevo mundo de posibilidades en el comercio electrónico!
              </p>
            </div>
          </div>
          <div className="text-center mt-8">
            <p className="text-sm text-gray-600">Desarrollado por Randy Sum Id #28 CUNOC/USAC ®</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
