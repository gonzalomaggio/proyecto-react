import React, { useContext } from "react";
import { CartContext } from "../../Context/CartContext";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import { Link } from "react-router-dom";
import { BsCartX } from "react-icons/bs";
import "./Cart.scss";

const Cart = () => {
  const {
    cart,
    increaseQuantity,
    decreaseQuantity,
    removeItem,
    getTotalItems,
    total,
    getSubtotal,
    clearCart,
  } = useContext(CartContext);
  console.log(cart);

  const formatPrice = (price) =>
    price.toLocaleString("es-ES", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

  const showCartResume = cart.length > 0;
  const showCheckoutButton = showCartResume && (
    <Link className="btn btn-success" to={"/checkout"}>
      Realizar compra
    </Link>
  );

  return (
    <Container>
      <section className="cart">
        <ul className="cart__container">
          {showCartResume ? (
            cart.map((item) => {
              const subtotal = getSubtotal(item.producto.id);
              return (
                <li key={item.producto.id} className="cartcard">
                  <img src={item.producto.img} alt={item.producto.name} />
                  <div className="cartcard__name">
                    <Link to={`/item/${item.producto.id}`}>
                      <h5>{item.producto.name}</h5>
                    </Link>
                    <Button
                      variant="outline-danger"
                      size="sm"
                      onClick={() => removeItem(item.producto.id)}
                    >
                      Eliminar
                    </Button>{" "}
                  </div>
                  <div className="cartcard__stock">
                    <div className="quantity-button">
                      <button
                        onClick={() => decreaseQuantity(item.producto.id)}
                      >
                        -
                      </button>
                      <span>{item.quantityToAdd}</span>
                      <button
                        onClick={() => increaseQuantity(item.producto.id)}
                      >
                        +
                      </button>
                    </div>
                    <p>{item.producto.stock} disponibles</p>
                  </div>
                  <div className="cartcard__prices">
                    <p>
                      $
                      {item.producto.price.toLocaleString("es-ES", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </p>
                    <p className="cartcard__subtotal">
                      $
                      {subtotal.toLocaleString("es-ES", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </p>
                  </div>
                </li>
              );
            })
          ) : (
            <li className="noproducts">
              <BsCartX className="noproducts__empty-cart" />
              <h5>¡No hay productos cargados!</h5>
              <Link to={"/"}>Descubrí Productos</Link>
            </li>
          )}
        </ul>
        <div className="cart__resume">
          <h3>Resumen de compra</h3>
          <hr />
          {showCartResume && (
            <>
              <div className="cart__resume-product">
                <p>Productos: ({getTotalItems()}) </p>
                <span> ${formatPrice(total)}</span>
              </div>
              <div className="cart__resume-delivery">
                <p>Envío:</p>
                <span>Gratis</span>
              </div>
              <div className="cart__resume-total">
                <p>TOTAL $</p>
                <div>
                  {total.toLocaleString("es-ES", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </div>
              </div>
              {showCheckoutButton}
              <Button variant="link" size="sm" onClick={clearCart}>
                Limpiar Carrito
              </Button>{" "}
            </>
          )}
          {!showCartResume && (
            <p className="cart__resume-noproduct">
              Acá verás el importe de tu compra cuando agregues productos
            </p>
          )}
        </div>
      </section>
    </Container>
  );
};

export default Cart;
