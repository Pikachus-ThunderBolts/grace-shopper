import React, { useState } from "react";
import { useParams } from "react-router-dom";
const ProductDetail = ({ products }) => {
  const { productId } = useParams();
  console.log(productId, "productId");
  const singleProduct = products.find((oneProduct) => {
    const foundProduct = oneProduct.id == productId;

    console.log(oneProduct.id, "OneProductId");
    return foundProduct;
  });

  console.log("singleProduct", singleProduct);
  if (singleProduct) {
    return (
      <>
        <section class="section">
          <div className="tile is-ancestor">
            <div class="tile is-parent">
              <article class="tile is-child notification is-white">
                <p class="title">{singleProduct.title}</p>
                <p class="subtitle">{singleProduct.price}</p>
                <figure class="image is-4by3">
                  <img src={singleProduct.img}></img>
                </figure>
                <p class="content">{singleProduct.brand}</p>
                <p class="content">{singleProduct.description}</p>
                <button class="button is-focused">Add to Cart</button>
              </article>
            </div>
          </div>
        </section>
        <section class="section has-background-info">
          <h1 class="title has-text-white">Reviews</h1>
          <br></br>
          <h2 class="subtitle has-text-white">Review Title</h2>
          <p classname="content has-text-white">
            This is where users will leave reviews.{" "}
          </p>
        </section>
      </>
    );
  }
};

export default ProductDetail;
