import { useState, useEffect } from "react";
import "./App.scss";
import Navbar from "./components/Navbar/Navbar";
import ItemListContainer from "./components/ItemListContainer/ItemListContainer";
import ItemDetailContainer from "./components/ItemdetailContainer/ItemDetailContainer";
import Slider from "react-slick";
import Delivery from "./components/Delivery/Delivery";
import Cart from "./components/Cart/Cart";
import Checkout from "./components/Checkout/Checkout";
import Error from "./components/Error/Error";
import RelatedProducts from "./components/RelatedProducts/RelatedProducts";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "./Context/CartContext";
import Footer from "./components/Footer/Footer";

function App() {
  return (
    <>
      <BrowserRouter>
        <CartProvider>
          <Navbar />
          <Routes>
            <Route path="/" element={<ItemListContainer />} />
            <Route
              path="/category/:categoryId"
              element={<ItemListContainer />}
            />
            <Route path="/item/:idProduct" element={<ItemDetailContainer />} />
            <Route path="/envios" element={<Delivery />} />
            <Route path="/carrito" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="*" element={<Error />} />
          </Routes>
          <Footer />
        </CartProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
