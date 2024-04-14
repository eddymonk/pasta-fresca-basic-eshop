import React, { useState, useEffect } from "react";
import CartProductNotFound from "../components/CartProductNotFound";
import { Link } from "react-router-dom";
import { FaLongArrowAltLeft } from "react-icons/fa";
//import classNames from "classnames";
import "../css/Cart.css";
import "../css/newCart.css";
import { productObj } from "../products/prodotti";

const Cart = () => {
  // const[total, SetTotal] = useState('')
  // useEffect(() => {
  //   setTotal(
  //       basket.reduce((acc, item) => {
  //           return acc + item.total;
  //       }, 0)
  //   );
  // }, [basket]);

  const [productCount, setProductCount] = useState(0);
  const [products, setProducts] = useState([]);
  const [productDetails, setProductDetails] = useState([]);

  useEffect(() => {
    const productCount = JSON.parse(localStorage.getItem("Products")) || [];
    setProductCount(productCount.length);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = productObj;

        if (result && Array.isArray(result.products)) {
          setProducts(result.products);
        } else {
          console.log("Il tuo carrello e' vuoto");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchProductDetails = async () => {
      const ProductIds = JSON.parse(localStorage.getItem("Products")) || [];
      const productsDetails = [];

      for (const productInfo of ProductIds) {
        const productId = productInfo.id;
        const productQuantity = productInfo.quantity;
        const product = products.find((product) => product.id === productId);

        if (product) {
          const productDetail = {
            thumbnail: product.thumbnail,
            price: product.price,
            title: product.title,
            catogory: product.catogory,
            description: product.description,
            id: product.id,
            quantity: productQuantity,
          };
          productsDetails.push(productDetail);
        }
      }

      setProductDetails(productsDetails);
    };

    fetchProductDetails();
  }, [products]);

  useEffect(() => {
    const handleProductDeleted = () => {
      const updatedProducts =
        JSON.parse(localStorage.getItem("Products")) || [];

      setProductDetails(updatedProducts);
      setProductCount(updatedProducts.length);
    };

    window.addEventListener("productDeleted", handleProductDeleted);

    return () => {
      window.removeEventListener("productDeleted", handleProductDeleted);
    };
  }, [productDetails, productCount, setProductDetails, setProductCount]);

  const DeleteProduct = (productId) => {
    const DeleteProducts = JSON.parse(localStorage.getItem("Products")) || [];
    const updatedFavorites = DeleteProducts.filter(
      (product) => product.id !== productId
    );
    localStorage.setItem("Products", JSON.stringify(updatedFavorites));
    setProductDetails((prevDetails) =>
      prevDetails.filter((product) => product.id !== productId)
    );

    setProductCount((prevCount) => prevCount - 1);
  };

  const AddQuantity = (productId) => {
    const productsInLocalStorage =
      JSON.parse(localStorage.getItem("Products")) || [];
    const productIndex = productsInLocalStorage.findIndex(
      (product) => product.id === productId
    );
    if (
      productIndex !== -1 &&
      productsInLocalStorage[productIndex].quantity > 0
    ) {
      productsInLocalStorage[productIndex].quantity += 1;

      localStorage.setItem("Products", JSON.stringify(productsInLocalStorage));

      const updatedProductDetails = productDetails.map((product) => {
        if (product.id === productId) {
          return {
            ...product,
            quantity: product.quantity + 1,
          };
        }
        return product;
      });

      setProductDetails(updatedProductDetails);
    }
  };

  const RemoveQuantity = (productId) => {
    const productsInLocalStorage =
      JSON.parse(localStorage.getItem("Products")) || [];
    const productIndex = productsInLocalStorage.findIndex(
      (product) => product.id === productId
    );

    if (
      productIndex !== -1 &&
      productsInLocalStorage[productIndex].quantity > 0
    ) {
      productsInLocalStorage[productIndex].quantity -= 1;

      if (productsInLocalStorage[productIndex].quantity === 0) {
        const updatedProductsInLocalStorage = productsInLocalStorage.filter(
          (product) => product.id !== productId
        );
        localStorage.setItem(
          "Products",
          JSON.stringify(updatedProductsInLocalStorage)
        );

        const updatedProductDetails = productDetails.filter(
          (product) => product.id !== productId
        );
        setProductDetails(updatedProductDetails);
        setProductCount((prevCount) => prevCount - 1);
      } else {
        localStorage.setItem(
          "Products",
          JSON.stringify(productsInLocalStorage)
        );

        const updatedProductDetails = productDetails.map((product) => {
          if (product.id === productId) {
            return {
              ...product,
              quantity: product.quantity - 1,
            };
          }
          return product;
        });
        setProductDetails(updatedProductDetails);
      }
    }
  };

  let totalPrice = 0;
  productDetails.map((product, index) => {
    return (totalPrice += product.price * product.quantity);
  });

  // const cartClass = classNames(
  //   {
  //     "d-flex": ProductCount > 0,
  //   },
  //   "justify-content-between"
  // );

  return (
    <>
      <link
        rel="stylesheet"
        href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
      />
      <link
        rel="stylesheet"
        href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.bundle.min.js"
      />
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js"
      />
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
      />
      <div className="card">
        <div className="row">
          <div className="col-md-8 cart">
            <div className="title">
              <div className="row">
                <div className="col">
                  <h4>
                    <b>Carrello</b>
                  </h4>
                </div>
                <div className="col align-self-center text-right text-muted">
                  {productCount} prodotti
                </div>
                {productCount === 0 && <CartProductNotFound />}
              </div>
            </div>
            {productDetails.map((product, index) => (
              <div className="row border-top border-bottom">
                <div className="row main align-items-center">
                  <div className="col-2">
                    <img
                      className="img-fluid"
                      src={product.thumbnail}
                      alt={`${index}`}
                    />
                  </div>
                  <div className="col">
                    <div className="row text-muted">{product.catogory}</div>
                    <div className="row">{product.title}</div>
                  </div>
                  <div className="col">
                    <Link
                      className="cartLinks"
                      onClick={() => RemoveQuantity(product.id)}>
                      -
                    </Link>
                    <Link className="border" id="cartLinks">
                      {product.quantity}
                    </Link>
                    <Link
                      className="cartLinks"
                      onClick={() => AddQuantity(product.id)}>
                      +
                    </Link>
                  </div>
                  <div className="col">
                    € {product.price * product.quantity}{" "}
                    <span
                      className="close"
                      onClick={() => DeleteProduct(product.id)}>
                      &#10005;
                    </span>
                  </div>
                </div>
              </div>
            ))}
            <div className="back-to-shop">
              <Link to="/">
                <FaLongArrowAltLeft />
              </Link>
              <span className="text-muted">Ritorna al negozio</span>
            </div>
          </div>
          <div className="col-md-4 summary">
            <div>
              <h5>
                <b>Riepilogo Carrello</b>
              </h5>
            </div>
            <hr />
            <div className="row">
              <div className="col" style={{ paddingLeft: 13 }}>
                {productCount} numero di prodotti:
              </div>
              <div className="col text-right">$ {totalPrice}</div>
            </div>
            <div
              className="row"
              style={{
                borderTop: "1px solid rgba(0,0,0,.1)",
                padding: "2vh 0",
              }}>
              <div className="col">PREZZO TOTALE</div>
              <div className="col text-right">$ {totalPrice}</div>
            </div>
            <button className="btn">INVIA ORDINE</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;
