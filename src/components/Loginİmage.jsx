import React from "react";
import PastaFresca from "../assets/pastaFresca.jpg";
import "../css/Loginİmage.css";

const Loginİmage = () => {
  return (
    <>
      <div class="container">
        <h1 className="imageText">
          Benvenuti nel pastificio Casagrande il magnifico
        </h1>
        <img className="Mainİmage" src={PastaFresca} alt="" />
      </div>
    </>
  );
};

export default Loginİmage;
