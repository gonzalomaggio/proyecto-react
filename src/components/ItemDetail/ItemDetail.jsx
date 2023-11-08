import React from "react";
import ItemCount from "../ItemCount/ItemCount";
import "./ItemDetail.scss";

const ItemDetail = ({ producto }) => {
  const onAdd = (quantity) => {
    console.log(quantity);
  };
  return (
    <>
      <div className="detail-container">
        <div>
          <img src={producto.img} alt={producto.name} />
        </div>
        <div>
          <h3>{producto.name}</h3>
          <p>{producto.price}</p>
          <p>{producto.description}</p>
          <ItemCount initial={1} stock={producto.stock} onAdd={onAdd} />
        </div>
      </div>
    </>
  );
};

export default ItemDetail;
