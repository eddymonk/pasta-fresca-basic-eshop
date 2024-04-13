import React from "react";
import "../css/FavNotFound.css";
import emptyImage from "../assets/FavBrokenHeart.png";

const FavNotFound = () => {
  return (
    <div className="not-found-container">
      <img src={emptyImage} alt="Empty" className="empty-image" />
      <h2>Oops!</h2>
      <p>La tua lista dei preferiti e' vuota.</p>
      <p>Perche' non aggiungi qualche elemento tra i preferiti?</p>
    </div>
  );
};

export default FavNotFound;
