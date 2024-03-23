import React from 'react';

const PageHome = () => {
  return (
    <div className="container">
      <div className="row">
        <div className="col-lg-12">
          <h1 className="text-center mb-4">Bienvenido la plataforma de comercio electrónico</h1>
          <p className="lead text-center mb-4">Explora nuestra amplia gama de productos y servicios para que  encuentres lo que necesitas.</p>
        </div>
      </div>

      <div className="row">
        <div className="col-lg-4 mb-4">
          <div className="card">
            <img src="https://www.shutterstock.com/image-photo/different-modern-devices-on-color-600nw-1875797689.jpg" className="card-img-top" alt="Tecnologia" />
            <div className="card-body">
              <h5 className="card-title">Electronicos</h5>
              <p className="card-text">De todo relacionado al mundo de la tecnologia.</p>
            </div>
          </div>
        </div>

        <div className="col-lg-4 mb-4">
          <div className="card">
            <img src="https://st4.depositphotos.com/2933339/24066/i/450/depositphotos_240664816-stock-photo-men-casual-outfit-men-shoes.jpg" className="card-img-top" alt="Ropa y Za" />
            <div className="card-body">
              <h5 className="card-title">Producto 2</h5>
              <p className="card-text">Descripción del producto 2.</p>
            </div>
          </div>
        </div>

        <div className="col-lg-4 mb-4">
          <div className="card">
            <img src="url_de_la_imagen_3" className="card-img-top" alt="Producto 3" />
            <div className="card-body">
              <h5 className="card-title">Producto 3</h5>
              <p className="card-text">Descripción del producto 3.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageHome;
