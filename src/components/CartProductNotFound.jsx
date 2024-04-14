import React from "react";
import "../css/CartProductNotFound.css";
import emptyImage from "../assets/CartEmpty.png";

const CartProductNotFound = () => {
  return (
    <div className="cart-not-found-container mt-5">
      <img src={emptyImage} alt="Empty" className="cart-empty-image" />
      <p>Il tuo carrello e' vuoto</p>
      <p>Perche' non aggiungere qualcosa?</p>
    </div>
  );
};

export default CartProductNotFound;
