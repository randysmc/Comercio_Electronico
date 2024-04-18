import React from 'react';

const PageHome = () => {
  return (
    <div className='bg-blue-200 py-5'>
      <div className="container py-5">
        <div className="row">
          <div className="col-lg-12">
            <h1 className="text-center mb-4">Bienvenido a la Plataforma de Comercio Electrónico</h1>
            <p className="lead text-center mb-4">Explora nuestra amplia gama de productos y servicios para encontrar lo que necesitas.</p>
          </div>
        </div>

        <div className="row">
          
          <div className="col-lg-4 mb-4">
            <div className="card">
              <img src="img/comercio_electronico_img/png-clipart-e-commerce-electronic-business-retail-online-shopping-e-commerce-website-electronics-web-design.png" style={{ width: '100%', height: '200px' }} className="card-img-top object-cover"   alt="Comercio Electrónico" />
              <div className="card-body">
                <h5 className="card-title">Actividad Económica</h5>
                <p className="card-text">
                  La actividad económica genera e intercambia productos, bienes o servicios para cubrir las necesidades de la población.
                </p>
              </div>
            </div>
          </div>

          <div className="col-lg-4 mb-4">
            <div className="card">
            <img src="img/comercio_electronico_img/istock-1129027191-copy.jpg" style={{ width: '100%', height: '200px' }} className="card-img-top object-cover"   alt="Comercio" />
              <div className="card-body">
                <h5 className="card-title">Comercio</h5>
                <p className="card-text">
                  Transferencia e intercambio de bienes y servicios entre personas o entidades en la economía.
                </p>
              </div>
            </div>
          </div>

          <div className="col-lg-4 mb-4">
            <div className="card">
            <img src="img/comercio_electronico_img/trueque.webp" style={{ width: '100%', height: '200px' }} className="card-img-top object-cover"   alt="Comercio Electrónico" />
              <div className="card-body">
                <h5 className="card-title">Trueque</h5>
                <p className="card-text">
                  Intercambio de mercancías por otras de igual o menor valor, una alternativa al comercio tradicional.
                </p>
              </div>
            </div>
          </div>

          <div className="col-lg-4 mb-4">
            <div className="card">
            <img src="img/comercio_electronico_img/monedadigital.jpg" style={{ width: '100%', height: '200px' }} className="card-img-top object-cover"   alt="Comercio Electrónico" />
              <div className="card-body">
                <h5 className="card-title">Moneda Digital</h5>
                <p className="card-text">
                  Nuestro sistema maneja su propia moneda digital, facilitando las transacciones y permitiendo intercambios seguros.
                </p>
              </div>
            </div>
          </div>

          <div className="col-lg-4 mb-4">
            <div className="card">
            <img src="img/comercio_electronico_img/roles.jpg" style={{ width: '100%', height: '200px' }} className="card-img-top object-cover"   alt="Comercio Electrónico" />
              <div className="card-body">
                <h5 className="card-title">Manejo de Roles</h5>
                <p className="card-text">
                  Roles definidos para administrador, vendedor, comprador y visitante, con diferentes privilegios y funciones.
                </p>
              </div>
            </div>
          </div>

          <div className="col-lg-4 mb-4">
            <div className="card">
            <img src="img/comercio_electronico_img/bitcoin.avif" style={{ width: '100%', height: '200px' }} className="card-img-top object-cover"   alt="Comercio Electrónico" />
              <div className="card-body">
                <h5 className="card-title">Bitcoin</h5>
                <p className="card-text">
                  Moneda interna para el intercambio.
                </p>
              </div>
            </div>
          </div>

          <div className="col-lg-4 mb-4">
            <div className="card">
            <img src="img/comercio_electronico_img/istock-1129027191-copy.jpg" style={{ width: '100%', height: '200px' }} className="card-img-top object-cover"   alt="Comercio Electrónico" />
              <div className="card-body">
                <h5 className="card-title">Secciones Específicas</h5>
                <p className="card-text">
                  Compra, venta, voluntariado y más, cada sección diseñada para cubrir diversas necesidades de los usuarios.
                </p>
              </div>
            </div>
          </div>

          <div className="col-lg-4 mb-4">
            <div className="card">
            <img src="img/comercio_electronico_img/intercambiomoneda.jpg" style={{ width: '100%', height: '200px' }} className="card-img-top object-cover"   alt="Comercio Electrónico" />
              <div className="card-body">
                <h5 className="card-title">Manejo de Moneda</h5>
                <p className="card-text">
                  Interfaz para intercambiar entre la moneda del sistema y la moneda local, facilitando las transacciones.
                </p>
              </div>
            </div>
          </div>

          <div className="col-lg-4 mb-4">
            <div className="card">
            <img src="img/comercio_electronico_img/voluntariado.avif" style={{ width: '100%', height: '200px' }} className="card-img-top object-cover"   alt="Comercio Electrónico" />
              <div className="card-body">
                <h5 className="card-title">Voluntariado</h5>
                <p className="card-text">
                  Publica anuncios para buscar o brindar apoyo en actividades, con créditos disponibles para futuras transacciones.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageHome;

