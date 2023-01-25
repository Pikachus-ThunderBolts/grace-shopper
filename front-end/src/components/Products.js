import { Route, Switch, Link } from "react-router-dom";
import React, { useState, useEffect } from "react";

const Products = ({ products, filteredProducts }) => {
  console.log("filtered products on products page", filteredProducts);
  console.log("products", products);
  return (
    <>
      <section class="section">
        <h1 class="title">Products</h1>
        <section class="section is-white">
          <div className="tile is-ancestor ">
            {filteredProducts.map((individualProduct) => {
              return (
                <Link to={`/product/${individualProduct.id}`} className="link">
                  <div class="tile is-parent">
                    <article class="tile is-child notification is-white box">
                      <p class="title">{individualProduct.title}</p>

                      <figure class="image is-4by3">
                        <img src={individualProduct.img}></img>
                      </figure>
                      <i class="fa-solid fa-cart-plus fa-2x"></i>
                      <p class="subtitle">{individualProduct.category}</p>
                      <p class="subtitle">${individualProduct.price}</p>
                      <p className="content">{individualProduct.description}</p>
                    </article>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>
      </section>
    </>
  );
};

export default Products;
