import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { createReview, deleteReview } from "../api/api";

export const ProductDetail = ({ products, reviews, setReviews, token }) => {
  const [reviewsPage, setReviewsPage] = useState([]);
  const { productIdParam } = useParams();
  const [title, setTitle] = useState("");
  const [review, setReview] = useState("");

  console.log("productId", productIdParam);
  //comment
  function fetchReviewsPage(reviews) {
    const newReviews = [];
    for (let i in reviews) {
      if (productIdParam == reviews[i].productId) {
        newReviews.push(reviews[i]);
      }
    }

    return newReviews;
  }

  const handleDeleteReview = async (id) => {
    console.log(`this is deleted review id -${id} this is token-${token}`);
    const deletedReview = await deleteReview(id, token);

    return deletedReview;
  };

  const handleCreateReview = async (
    title,
    review,
    productIdParam,
    customerUserId,
    guestId
  ) => {
    console.log(`this is title -${title} this is review -${review}`);
    const newReview = await createReview(
      title,
      review,
      productIdParam,
      customerUserId,
      guestId
    );
    setReviews((previousReviews) => [...previousReviews, newReview]);
    return newReview;
  };

  useEffect(() => {
    const getReviewsPage = async () => {
      const reviewsPage = await fetchReviewsPage(reviews);

      setReviewsPage(reviewsPage);
    };
    getReviewsPage();
  }, []);

  console.log("reviewsPage", reviewsPage);

  const singleProduct = products.find((oneProduct) => {
    const foundProduct = oneProduct.id == productIdParam;

    return foundProduct;
  });

  const singleReview = reviews.find((oneReview) => {
    const foundReview = oneReview.productId == productIdParam;

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
                <div class="buttons has-addons is-justify-content-space-between">
                  {" "}
                  <button class="button is-success">Edit</button>
                  <button class="button is-danger">Delete</button>
                </div>
              </article>
            </div>
          </div>
        </section>
        <section class="section has-background-info">
          <h1 class="title has-text-white has-text-centered">Leave Reviews</h1>

          <br></br>
          <form
            onSubmit={(event) => {
              console.log("please work");
              event.preventDefault();
              handleCreateReview(title, review, productIdParam);
              setTitle("");
              setReview("");
            }}
          >
            <div class="field">
              <label class="label">Review Title</label>
              <div class="control">
                <input
                  class="input"
                  type="text"
                  value={title}
                  placeholder="Review Title"
                  required
                  onChange={(event) => {
                    setTitle(event.target.value);
                  }}
                ></input>
              </div>
            </div>

            <div class="field">
              <label class="label">Review</label>
              <div class="control">
                <textarea
                  class="textarea"
                  placeholder="My review"
                  value={review}
                  required
                  onChange={(event) => setReview(event.target.value)}
                ></textarea>
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
          </form>
          <hr></hr>
        </section>
        <section className="section has-background-light">
          <h1 className="title has-text-centered ">Reviews</h1>

          {reviewsPage.map((individualReview) => {
            return (
              <div className="title is-ancestor box">
                <h1 className="title">{individualReview.title}</h1>

                <p className="subtitle">{individualReview.review}</p>
                <div class="buttons has-addons is-justify-content-space-between">
                  {" "}
                  <button class="button is-success edit">Edit</button>
                  <button
                    class="button is-danger"
                    onClick={(event) => {
                      console.log("delete click", individualReview.id);
                      event.preventDefault();
                      handleDeleteReview(individualReview.id, token);
                    }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            );
          })}
        </section>
      </>
    );
  }
};

export default ProductDetail;
