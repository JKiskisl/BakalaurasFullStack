import React from "react";
import "./product.css";

import US from "../../assets/360mind logo.png";

const Product = () => {
  return (
    <section id="product">
      <h5>Learn about our</h5>
      <h2>Product</h2>
      <div className="product-content">
        <h2 className="product-title">
          Your mental health is important – 360 Mind gives you the tools to help
          you improve it
        </h2>
        <p className="product-description">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci nam
          voluptatum cupiditate, suscipit numquam in eum veniam distinctio,
          dolorem porro ipsa at odit quod modi. Pariatur esse repellat
          consectetur aut.
        </p>
      </div>
      <div className="product-image">
        <img src={US} alt="US" />
      </div>
    </section>
  );
};

export default Product;
