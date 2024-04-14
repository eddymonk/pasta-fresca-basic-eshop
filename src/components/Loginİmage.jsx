import React from "react";
import PastaFresca from "../assets/pastaFresca.jpg";
import "../css/Loginİmage.css";

const Loginİmage = () => {
  return (
    <>
      <div class="container">
        <h1 className="imageText">
          Offerta speciale: Tortellini con carne mista 4 Euro al kilo fino al 20
          Giugno
        </h1>
        <img className="Mainİmage" src={PastaFresca} alt="" />
      </div>
    </>
  );
};

export default Loginİmage;
