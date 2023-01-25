import { Route, Switch, Link } from "react-router-dom";
import React, { useState, useEffect } from "react";

const Products = ({ products, filteredProducts }) => {
  return (
    <>
      <section className="section">
        <h1 className="title">Products</h1>
        <section className="section is-white">
          <div className="tile is-ancestor productCard">
            {filteredProducts.map((individualProduct) => {
              return (
                <Link to={`/product/${individualProduct.id}`} className="link">
                  <div className="tile is-parent">
                    <article className="tile is-child notification is-white box">
                      <p className="title">{individualProduct.title}</p>

                      <figure className="image is-4by3">
                        <img src={individualProduct.img}></img>
                      </figure>
                      <i className="fa-solid fa-cart-plus fa-2x cart"></i>
                      <p className="subtitle">{individualProduct.category}</p>
                      <p className="subtitle">${individualProduct.price}</p>
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
