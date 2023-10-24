import { useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import ItemListContainer from "./components/ItemListContainer/ItemListContainer";

function App() {
  const greeting = "Un mundo para tu bebé";

  return (
    <>
      <Navbar />
      <ItemListContainer mensaje={greeting} />
    </>
  );
}

export default App;
