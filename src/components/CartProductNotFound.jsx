import React from "react";
import "../css/CartProductNotFound.css";
import emptyImage from "../assets/CartEmpty.png";

const CartProductNotFound = () => {
  return (
    <div className="cart-not-found-container">
      <img src={emptyImage} alt="Empty" className="cart-empty-image" />
      <h2>Oops!</h2>
      <p>Il tuo carrello e' vuoto</p>
      <p>Perche' non aggiungere qualcosa?</p>
    </div>
  );
};

export default CartProductNotFound;
