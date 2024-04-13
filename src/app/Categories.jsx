import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Search";
//import Button from "@mui/material/Button";
//import { IoIosHeart, IoMdHeartEmpty } from "react-icons/io";
import "../css/ecommerce-category-product.css";
import "../css/filter.css";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import toast, { Toaster } from "react-hot-toast";
//import styled from "styled-components";
import FavoriteHeart from "../components/FavoriteAddHeart";
import { productObj } from "../products/prodotti";

// const IconButton = styled(Button)`
//   && {
//     padding: 0;
//     min-width: unset;
//     width: auto;
//     left: 0;
//   }
// `;

// const HeartIconEmpty = styled(IoMdHeartEmpty)`
//   font-size: 24px;
// `;

// const HeartIcon = styled(IoIosHeart)`
//   font-size: 24px;
//   color: red;
// `;

function Filter() {
  const [favoritesCount, setFavoritesCount] = useState(0);
  const [products, setProducts] = useState([]);
  const [productDetails, setProductDetails] = useState([]);
  //const [basket, setBasket] = useState([]);
  //const [total, setTotal] = useState(0);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  console.log({ favoritesCount, productDetails });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = productObj;

        if (result && Array.isArray(result.products)) {
          setProducts(result.products);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  console.log(products, "products");

  useEffect(() => {
    const fetchProductDetails = async () => {
      const favoriteIds = JSON.parse(localStorage.getItem("Favorites")) || [];
      const productsDetails = [];

      for (const id of favoriteIds) {
        const product = products.find((product) => product.id === id);
        if (product) {
          productsDetails.push({
            thumbnail: product.thumbnail,
            price: product.price,
            title: product.title,
            description: product.description,
            id: product.id,
          });
        }
      }

      setProductDetails(productsDetails);
      setFavoritesCount(favoriteIds.length);
    };

    fetchProductDetails();
  }, [products]);

  // const DeleteFavorite = (productId) => {
  //   const favorites = JSON.parse(localStorage.getItem("Favorites")) || [];
  //   const updatedFavorites = favorites.filter((favId) => favId !== productId);
  //   localStorage.setItem("Favorites", JSON.stringify(updatedFavorites));
  //   setProductDetails((prevDetails) =>
  //     prevDetails.filter((product) => product.id !== productId)
  //   );
  //   setFavoritesCount((prevCount) => prevCount - 1);
  // };

  const [ProductItem, setProductItem] = useState(checkIfProduct());

  function checkIfProduct(productİtemId) {
    const ProductsItems = JSON.parse(localStorage.getItem("Products")) || [];
    return ProductsItems.includes(productİtemId);
  }

  const toggleProduct = (productId) => {
    let ProductItems = JSON.parse(localStorage.getItem("Products")) || [];

    const productIndex = ProductItems.findIndex(
      (item) => item.id === productId
    );

    if (productIndex === -1) {
      ProductItems.push({ id: productId, quantity: 1 });
    } else {
      ProductItems[productIndex].quantity += 1;
    }

    localStorage.setItem("Products", JSON.stringify(ProductItems));
    setProductItem(!ProductItem);

    toast.success("Product successfully added to cart", {
      style: {
        boxShadow: "none",
      },
    });
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = productObj;

        if (result && Array.isArray(result.products)) {
          setProducts(result.products);
          setFilteredProducts(result.products);

          const uniqueCategories = Array.from(
            new Set(result.products.map((product) => product.category))
          );
          setCategories(uniqueCategories);
        } else {
          console.error("Invalid data structure:", result);
          setProducts([]);
          setFilteredProducts([]);
          setCategories([]);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleSearch = (searchValue) => {
    const filtered = products.filter((product) =>
      product.title.toLowerCase().includes(searchValue.toLowerCase())
    );

    setFilteredProducts(filtered);

    const uniqueCategories = Array.from(
      new Set(filtered.map((product) => product.category))
    );
    setCategories(uniqueCategories);
  };
  const handleChange = (event) => {
    const selectedCategory = event.target.value;
    let filteredProducts = [];
    if (selectedCategory === "All") {
      filteredProducts = products;
    } else {
      filteredProducts = products.filter(
        (product) => product.category === selectedCategory
      );
    }
    setFilteredProducts(filteredProducts);

    const uniqueCategories = Array.from(
      new Set(filteredProducts.map((product) => product.category))
    );
    setCategories(uniqueCategories);
  };

  return (
    <>
      <Toaster />
      <Header onSearch={handleSearch} />
      <div className="MainContainer" style={{ display: "flex" }}>
        <FormControl className="FilterBar">
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            className="categories"
            defaultValue="All"
            name="radio-buttons-group"
            onChange={handleChange}>
            <FormLabel
              id="demo-radio-buttons-group-label"
              className="CategoriesText">
              Categories
            </FormLabel>
            {/* <Typography className="line">---------------------------------------------------</Typography> */}
            <FormControlLabel value="All" control={<Radio />} label="All" />
            <FormControlLabel
              value="Tortellini"
              control={<Radio />}
              label="Tortellini"
            />
            <FormControlLabel
              value="Ravioli"
              control={<Radio />}
              label="Ravioli"
            />
            <FormControlLabel
              value="Pasta Fresca"
              control={<Radio />}
              label="Pasta Fresca"
            />
          </RadioGroup>
        </FormControl>
        <div className="Product-Container-Catogory">
          {categories.map((category) => (
            <div key={category} className="filter-category-container">
              <h2 className="Filter-category-title">{category}</h2>
              <div className="Filter-product-container">
                {filteredProducts
                  .filter((product) => product.category === category)
                  .map((product, index) => (
                    <div className="ProductContainer page-wrapper" key={index}>
                      <div
                        className="ProductContainer page-wrapper"
                        key={index}>
                        <div className="page-inner">
                          <div className="row">
                            <div className="el-wrapper">
                              <div className="box-up">
                                <img
                                  className="img"
                                  id="Favİtemİmage"
                                  src={product.thumbnail}
                                  alt=""
                                />
                                <div className="img-info">
                                  <div className="info-inner">
                                    <span className="p-name">
                                      {product.title}
                                    </span>
                                    {/* <span className="p-company">MeMo</span> */}
                                  </div>
                                  <div className="a-size">
                                    {product.description}
                                  </div>
                                </div>
                              </div>

                              <div className="box-down">
                                <div className="h-bg">
                                  <div className="h-bg-inner"></div>
                                </div>
                                <Link className="cart">
                                  <span className="price">
                                    € {product.price} x kilo
                                  </span>
                                  <span className="add-to-cart">
                                    <span className="txt">
                                      <Link
                                        className="GoToCartLink"
                                        onClick={() =>
                                          toggleProduct(product.id)
                                        }>
                                        Add Cart
                                      </Link>

                                      <FavoriteHeart
                                        productId={product.id}
                                        id="PFTrash"
                                      />
                                    </span>
                                  </span>
                                </Link>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Filter;
