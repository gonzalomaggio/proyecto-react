import React, { useState, useEffect, useContext } from "react";
import { CartContext } from "../../Context/CartContext";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import { BsCartCheck } from "react-icons/bs";
import "./Checkout.scss";
import {
  collection,
  addDoc,
  updateDoc,
  doc,
  getDoc,
  getFirestore,
} from "firebase/firestore";

const Checkout = () => {
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [telefono, setTelefono] = useState("");
  const [email, setEmail] = useState("");
  const [emailConfirmacion, setEmailConfirmacion] = useState("");
  const [direccion, setDireccion] = useState("");
  const [error, setError] = useState("");
  const [orderId, setOrderId] = useState("");
  const [emailMatchError, setEmailMatchError] = useState(false);
  const [newsletter, setNewsletter] = useState(true);
  const { cart, total, getTotalItems, clearCart } = useContext(CartContext);
  const [validated, setValidated] = useState(false);
  const [completed, setCompleted] = useState(false);

  const handleSubmit = async (event) => {
    const form = event.currentTarget;
    event.preventDefault();
    event.stopPropagation();

    if (form.checkValidity() === false) {
      setValidated(true);
      return;
    }

    const db = getFirestore();
    const order = {
      items: cart.map((producto) => ({
        id: producto.producto.id,
        nombre: producto.producto.name,
        cantidad: producto.quantityToAdd,
      })),
      total: total,
      fecha: new Date(),
      nombre,
      apellido,
      direccion,
      telefono,
      email,
      newsletter,
    };

    try {
      const updates = order.items.map(async (productoOrder) => {
        const productoRef = doc(db, "products", productoOrder.id);
        const productoDoc = await getDoc(productoRef);
        const stockActual = productoDoc.data().stock;

        await updateDoc(productoRef, {
          stock: !isNaN(stockActual) ? stockActual - productoOrder.cantidad : 0,
        });
      });

      await Promise.all(updates);

      const docRef = await addDoc(collection(db, "orders"), order);
      setOrderId(docRef.id);
      clearCart();
      setCompleted(true);
    } catch (error) {
      console.error("Error al procesar la orden:", error);
      setError("Hubo un error al procesar la orden.");
    }
  };

  return (
    <Container>
      {completed ? (
        <div className="mensaje-final">
          <BsCartCheck className="mensaje-final-cart" />
          <h3>¡Tu compra se realizó con éxito!</h3>
          <p>
            Tu número de orden es: <strong>{orderId}</strong>. <br /> Nos
            pondremos en contacto a la brevedad para coordinar la entrega.
          </p>
        </div>
      ) : (
        <section className="form__container">
          <Form
            noValidate
            validated={validated}
            onSubmit={handleSubmit}
            className="form__container-form"
          >
            <h2 className="form__container-title">Completá tus datos</h2>
            <Row className="mb-2">
              <Form.Group as={Col} md="5" controlId="validationCustom01">
                <Form.Label>Nombre</Form.Label>
                <Form.Control
                  required
                  type="text"
                  onChange={(e) => setNombre(e.target.value)}
                  maxLength="20"
                />
                <Form.Control.Feedback type="invalid">
                  Ingrese un nombre
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} md="5" controlId="validationCustom02">
                <Form.Label>Apellido</Form.Label>
                <Form.Control
                  required
                  type="text"
                  onChange={(e) => setApellido(e.target.value)}
                  maxLength="20"
                />
                <Form.Control.Feedback>Válido</Form.Control.Feedback>
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col} md="5" controlId="validationCustom03">
                <Form.Label>Teléfono</Form.Label>
                <Form.Control
                  type="tel"
                  placeholder="Código de área sin el 0 y sin el 15"
                  onChange={(e) => setTelefono(e.target.value)}
                  required
                  pattern="[0-9]{8,11}"
                />
                <Form.Control.Feedback type="invalid">
                  Ingrese un teléfono válido.
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} md="5" controlId="validationCustom04">
                <Form.Label>Dirección</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Calle + N°"
                  onChange={(e) => setDireccion(e.target.value)}
                  required
                  maxLength="25"
                />
                <Form.Control.Feedback type="invalid">
                  Ingrese una dirección válida.
                </Form.Control.Feedback>
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col} md="5" controlId="validationCustom05">
                <Form.Label>E-Mail</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="ejemplo@ejemplo.com"
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Ingrese un e-mail válido.
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} md="5" controlId="validationCustom06">
                <Form.Label>E-Mail de confirmación</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Ingrese nuevamente su e-mail"
                  onChange={(e) => {
                    setEmailConfirmacion(e.target.value);
                    setEmailMatchError(email !== e.target.value);
                  }}
                  required
                />
                <Form.Control.Feedback
                  type="invalid"
                  style={{ display: emailMatchError ? "block" : "none" }}
                >
                  Su e-mail no coincide
                </Form.Control.Feedback>
              </Form.Group>
            </Row>
            <Form.Group className="pb-3" controlId="checkbox">
              <Form.Check
                label="Deseo recibir novedades en mi e-mail"
                defaultChecked
                onChange={(e) => {
                  setNewsletter(e.target.checked);
                }}
              />
            </Form.Group>
            <Button type="submit">Terminar Compra</Button>
          </Form>
          <div className="cart__resume">
            <h3>Resumen de compra</h3>
            <hr />
            <div className="cart__resume-product">
              <p>Productos: ({getTotalItems()}) </p>
              <span>
                {" "}
                $
                {total.toLocaleString("es-ES", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </span>
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
          </div>
        </section>
      )}
    </Container>
  );
};

export default Checkout;
