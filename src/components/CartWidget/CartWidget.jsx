import React, { useContext } from "react";
import { BiCart } from "react-icons/bi";
import { CartContext } from "../../Context/CartContext";
import { Link } from "react-router-dom";
import "./cartwidget.scss";

const CartWidget = () => {
  const { getTotalItems } = useContext(CartContext);
  const totalItems = getTotalItems();

  return (
    <div className="cartwidget">
      {totalItems !== 0 ? (
        <>
          <p>{totalItems}</p>
          <Link to={"/carrito"}>
            <BiCart className="cart" />
          </Link>
        </>
      ) : (
        <Link to={"/carrito"}>
          <BiCart className="cart" />
        </Link>
      )}
    </div>
  );
};

export default CartWidget;
