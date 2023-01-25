import { Route, Switch, Link } from "react-router-dom";
import React, { useState, useEffect } from "react";

const Products = ({ products, filteredProducts }) => {
  return (
    <>
      <section class="section">
        <h1 class="title">Products</h1>
        <section class="section is-white">
          <div className="tile is-ancestor is-flex-wrap-wrap ">
            {filteredProducts.map((individualProduct) => {
              return (
                <Link to={`/product/${individualProduct.id}`} className="link">
                  <div class="tile is-parent">
                    <article class="tile is-child notification is-white box">
                      <p class="title">{individualProduct.title}</p>

                      <figure class="image-is-square">
                        <img 
                          src={individualProduct.img}
                          width="250"
                          height="250"
                        ></img>
                      </figure>

                      <p class="subtitle">{individualProduct.category}</p>
                      <p class="subtitle">${individualProduct.price}</p>
                      <div class="buttons has-addons is-justify-content-space-between">
                        {" "}
                        <button class="button is-success">Edit</button>
                        <button class="button is-danger">Delete</button>
                      </div>
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
