import React, { useState } from "react";
import { useParams } from "react-router-dom";
const ProductDetail = ({ products, reviews }) => {
  const { productId } = useParams();
  const singleProduct = products.find((oneProduct) => {
    const foundProduct = oneProduct.id == productId;

    return foundProduct;
  });

  const singleReview = reviews.find((oneReview) => {
    const foundReview = oneReview.id == productId;

    return foundReview;
  });

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
          <h1 class="title has-text-white">Leave Reviews</h1>
          <br></br>
          <div class="field">
            <label class="label">Review Title</label>
            <div class="control">
              <input class="input" type="text" placeholder="Text input"></input>
            </div>
          </div>

          <div class="field">
            <label class="label">Review</label>
            <div class="control">
              <textarea class="textarea" placeholder="Textarea"></textarea>
            </div>
          </div>

          <div class="field is-grouped">
            <div class="control">
              <button class="button is-link">Submit</button>
            </div>
            <div class="control">
              <button class="button is-link is-light">Cancel</button>
            </div>
          </div>
          <hr></hr>
          {singleReview ? (
            <article class="media box">
              <div class="media-content">
                <h1 class="title">Reviews</h1>
                <hr></hr>
                <div className="content">
                  <h1>{singleReview.title}</h1>
                  <p>{singleReview.review}</p>
                </div>
              </div>
            </article>
          ) : null}
        </section>
      </>
    );
  }
  if (singleReview) {
    return <h1>working</h1>;
  }
};

export default ProductDetail;
