import React from "react";
import { BsTruck } from "react-icons/bs";
import { Link } from "react-router-dom";
import "./item.scss";

const Item = ({ product }) => {
  const originalPrice = product.price / (1 - product.descount / 100);
  const formattedPrice = product.price.toLocaleString("es-ES", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  const formattedOriginalPrice = originalPrice.toLocaleString("es-ES", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return (
    <>
      <Link to={`/item/${product.id}`}>
        <div className="contenedor">
          <div>
            <img src={product.img} alt="" />
          </div>
          <div>
            <h3 className="contenedor__name">{product.name}</h3>
            <p className="contenedor__price">${formattedPrice}</p>
            <p className="contenedor__description">{product.description}</p>
            {product.descount > 0 ? (
              <>
                <div className="contenedor__descount">
                  <p className="descount-percentage">{product.descount}% off</p>
                  <span className="original-price">
                    ${formattedOriginalPrice}
                  </span>
                </div>
              </>
            ) : null}
            <p className="contenedor__delivery">
              <BsTruck className="delivery-truck" />
              <span className="delivery-text">Envío Gratis</span>
            </p>
          </div>
        </div>
      </Link>
    </>
  );
};

export default Item;
