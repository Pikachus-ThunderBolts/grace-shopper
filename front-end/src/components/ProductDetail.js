import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ProductDetail = ({ products, reviews }) => {
  const [reviewsPage, setReviewsPage] = useState([]);
  const { productId } = useParams();

  function fetchReviewsPage(reviews) {
    const newReviews = [];
    for (let i in reviews) {
      if (productId == reviews[i].productId) {
        newReviews.push(reviews[i]);
      }
    }
    return newReviews;
  }

  useEffect(() => {
    const getReviewsPage = async () => {
      const reviewsPage = await fetchReviewsPage(reviews);

      setReviewsPage(reviewsPage);
    };
    getReviewsPage();
  }, []);

  console.log("reviewsPage", reviewsPage);

  const singleProduct = products.find((oneProduct) => {
    const foundProduct = oneProduct.id == productId;

    return foundProduct;
  });

  const singleReview = reviews.find((oneReview) => {
    const foundReview = oneReview.productId == productId;

    return foundReview;
  });

  singleReview;

  if (singleProduct) {
    return (
      <>
        <section class="section">
          <div className="tile is-ancestor">
            <div class="tile is-parent">
              <article class="tile is-child notification is-white">
                <p class="title has-text-centered">{singleProduct.title}</p>

                <figure class="image is-4by3">
                  <img src={singleProduct.img}></img>
                </figure>
                <p class="subtitle">{singleProduct.price}</p>
                <p class="content">{singleProduct.brand}</p>
                <p class="content">{singleProduct.description}</p>
                <button class="button is-focused">Add to Cart</button>
              </article>
            </div>
          </div>
        </section>
        <section class="section has-background-info">
          <h1 class="title has-text-white has-text-centered">Leave Reviews</h1>

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
        </section>
        <section className="section has-background-light">
          <h1 className="title has-text-centered ">Reviews</h1>

          {reviewsPage.map((individualReview) => {
            return (
              <div className="title is-ancestor box">
                <h1 className="title">{individualReview.title}</h1>

                <p className="subtitle">{individualReview.review}</p>
              </div>
            );
          })}
        </section>
      </>
    );
  }
};

export default ProductDetail;
