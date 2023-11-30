import React, { useState, useEffect } from "react";
import ItemList from "../ItemList/ItemList";
import Spinner from "react-bootstrap/Spinner";
import Container from "react-bootstrap/Container";
import { useParams } from "react-router-dom";
import Pagination from "react-bootstrap/Pagination";
import "./itemListContainer.scss";
import {
  collection,
  doc,
  getDocs,
  getFirestore,
  query,
  where,
} from "firebase/firestore";

const ItemListContainer = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(9);
  const [loading, setLoading] = useState(true);

  const { categoryId } = useParams();

  useEffect(() => {
    setLoading(true);

    const db = getFirestore();
    const myProducts =
      categoryId === "Ofertas"
        ? query(collection(db, "products"), where("descount", ">", 0))
        : categoryId
        ? query(collection(db, "products"), where("category", "==", categoryId))
        : collection(db, "products");
    getDocs(myProducts)
      .then((res) => {
        const newProducts = res.docs.map((doc) => {
          const data = doc.data();
          return { id: doc.id, ...data };
        });
        setProducts(newProducts);
        setCurrentPage(1);
      })
      .catch((error) => console.log(error))
      .finally(() => {
        setLoading(false);
      });
  }, [categoryId]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = products.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <>
      <Container>
        {loading ? (
          <div className="spinner">
            <Spinner animation="border" />
            <span>Cargando...</span>
          </div>
        ) : (
          <>
            {categoryId ? (
              <h1 className="tituloseccion">{categoryId}</h1>
            ) : (
              <h1 className="tituloseccion">Smartphones</h1>
            )}
            <section className="productos">
              <ItemList products={currentItems} />
            </section>
            <Pagination className="paginacion">
              {Array.from(
                { length: Math.ceil(products.length / itemsPerPage) },
                (_, index) => (
                  <Pagination.Item
                    key={index + 1}
                    active={index + 1 === currentPage}
                    onClick={() => setCurrentPage(index + 1)}
                  >
                    {index + 1}
                  </Pagination.Item>
                )
              )}
            </Pagination>
          </>
        )}
      </Container>
    </>
  );
};

export default ItemListContainer;
