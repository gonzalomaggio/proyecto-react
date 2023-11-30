import React from "react";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import "./itemCount.scss";

const ItemCount = ({ initial, stock, onAdd }) => {
  const [count, setCount] = useState(initial);

  const increment = () => {
    if (count < stock) {
      setCount((prevCount) => prevCount + 1);
    }
  };

  const decrement = () => {
    if (count > initial) {
      setCount((prevCount) => prevCount - 1);
    }
  };

  const handleAddToCart = () => {
    onAdd(count);
  };

  return (
    <>
      <div className="quantity-button">
        <button onClick={decrement} disabled={count <= initial}>
          -
        </button>
        <span>{count}</span>
        <button onClick={increment} disabled={count >= stock}>
          +
        </button>
      </div>
      <div>
        <Button
          variant="primary"
          size="sm"
          onClick={handleAddToCart}
          disabled={count <= 0}
        >
          Agregar al carrito
        </Button>{" "}
      </div>
    </>
  );
};

export default ItemCount;
