import React, { useState, useContext, useEffect, useRef } from "react";
import ItemCount from "../ItemCount/ItemCount";
import { BsTruck } from "react-icons/bs";
import { Link } from "react-router-dom";
import { CartContext } from "../../Context/CartContext";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import Container from "react-bootstrap/esm/Container";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/scss/image-gallery.scss";
import "./ItemDetail.scss";

const ItemDetail = ({ producto }) => {
  const [quantity, setQuantity] = useState(0);
  const { addToCart } = useContext(CartContext);
  const imagesRef = React.useRef(null);
  const formattedPrice = producto.price.toLocaleString("es-ES", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  const formattedOriginalPrice = (
    producto.price /
    (1 - producto.descount / 100)
  ).toLocaleString("es-ES", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  const cuotas = (producto.price / 6).toLocaleString("es-ES", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  const images = [
    { original: producto.img, thumbnail: producto.img },
    { original: producto.img1, thumbnail: producto.img1 },
    { original: producto.img2, thumbnail: producto.img2 },
  ];

  useEffect(() => {
    const fetchProductStock = async () => {
      const db = getFirestore();
      const productRef = doc(db, "products", producto.id);
      const productDoc = await getDoc(productRef);

      if (productDoc.exists()) {
        const stock = productDoc.data().stock;
        setQuantity(stock === 0 ? -1 : 0);
      }
    };

    if (imagesRef.current) {
      imagesRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }

    fetchProductStock();
  }, [producto.id]);

  const onAdd = (quantityToAdd) => {
    setQuantity(quantityToAdd);
    addToCart(producto, quantityToAdd);
  };

  return (
    <Container>
      <div className="detail-container">
        <div ref={imagesRef} className="detail-image">
          <ImageGallery
            items={images}
            showFullscreenButton={false}
            showPlayButton={false}
            showNav={false}
            thumbnailPosition={"left"}
          />
        </div>
        <div className="detail-desc">
          <h3>{producto.name}</h3>
          <div className="detail-price">
            <p className="amount">${formattedPrice}</p>
            {producto.descount > 0 && (
              <div className="contenedor__descount">
                <p className="descount-percentage">{producto.descount}% off</p>
              </div>
            )}
          </div>
          {formattedOriginalPrice !== formattedPrice && (
            <p className="original-price">${formattedOriginalPrice}</p>
          )}

          <p className="quotes">Mismo precio en 6 cuotas de ${cuotas}</p>
          <h5>Lo que tenés que saber de este producto</h5>
          <p>{producto.description}</p>
          <p className="contenedor__delivery">
            <BsTruck className="delivery-truck" />
            <span className="delivery-text">Envío Gratis</span>
          </p>
          {quantity === 0 ? (
            <ItemCount initial={1} stock={producto.stock} onAdd={onAdd} />
          ) : quantity === -1 ? (
            <p className="nostock">Sin Stock</p>
          ) : (
            <Link to={"/carrito"} className="vercarrito">
              Ver Carrito
            </Link>
          )}
        </div>
      </div>
    </Container>
  );
};

export default ItemDetail;
