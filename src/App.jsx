import { useState, useEffect } from "react";

import "./App.scss";
import Navbar from "./components/Navbar/Navbar";
import ItemListDescounContainer from "./components/ItemListdescountContainer/ItemListDescountContainer";
import ItemListContainer from "./components/ItemListContainer/ItemListContainer";
import ItemDetailContainer from "./components/ItemdetailContainer/ItemDetailContainer";
import Slider from "./components/Slider/Slider";
import Delivery from "./components/Delivery/Delivery";
import Error from "./components/Error/Error";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<ItemListContainer />} />
          <Route path="/category/:categoryId" element={<ItemListContainer />} />

          <Route path="/item/:idProduct" element={<ItemDetailContainer />} />
          <Route path="/envios" element={<Delivery />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
