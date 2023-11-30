import React, { useState, useEffect } from "react";
import Spinner from "react-bootstrap/Spinner";
import ItemDetail from "../ItemDetail/ItemDetail";
import RelatedProducts from "../RelatedProducts/RelatedProducts";
import { useParams } from "react-router-dom";
import "./ItemDetailContainer.scss";
import {
  getFirestore,
  getDoc,
  doc,
  getDocs,
  collection,
} from "firebase/firestore";

const ItemDetailContainer = () => {
  const [product, setProduct] = useState(null);
  const [allProducts, setAllProducts] = useState([]);
  const { idProduct } = useParams();

  useEffect(() => {
    const db = getFirestore();

    const fetchProductDetails = async () => {
      try {
        const productRef = doc(db, "products", idProduct);
        const productSnapshot = await getDoc(productRef);

        if (productSnapshot.exists()) {
          const productData = productSnapshot.data();
          const newProduct = { id: productSnapshot.id, ...productData };
          setProduct(newProduct);
        } else {
          console.log("No existe el producto");
        }

        const productsCollection = collection(db, "products");
        const allProductsSnapshot = await getDocs(productsCollection);
        const productsData = allProductsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setAllProducts(productsData);
      } catch (error) {
        console.error("Error al obtener los productos", error);
      }
    };

    fetchProductDetails();
  }, [idProduct]);

  return (
    <section className="itemdetail-container">
      {product ? (
        <>
          <ItemDetail producto={product} />
          <RelatedProducts allProducts={allProducts} currentProduct={product} />
        </>
      ) : (
        <div className="spinner">
          <Spinner animation="border" />
          <span>Cargando...</span>
        </div>
      )}
    </section>
  );
};

export default ItemDetailContainer;
