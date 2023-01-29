import React, { useEffect, useState } from "react";
import { Route, Switch, Link } from "react-router-dom";
import { useHistory, useParams } from "react-router-dom";
import { createReview, deleteReview, deleteProduct } from "../api/api";

export const ProductDetail = ({
  products,
  reviews,
  setReviews,
  setProducts,
  token,
  adminUser,
  setLocalCart,
  localCart,
}) => {
  const [reviewsPage, setReviewsPage] = useState([]);
  const { productIdParam } = useParams();
  const [title, setTitle] = useState("");
  const [review, setReview] = useState("");
  const history = useHistory();

  const individualProduct = products.find(
    (object) => object.id == productIdParam
  );

  /*function fetchReviewsPage(reviews) {
    const newReviews = [];
    console.log("new Reviews", newReviews);
    for (let i in reviews) {
      if (productIdParam == reviews[i].productId) {
        newReviews.push(reviews[i]);
      }
    }

    setReviewsPage(newReviews);
  }

  */

  const handleDeleteReview = async (id, token) => {
    // console.log(`this is deleted review id -${id} this is token-${token}`);
    const deletedReview = await deleteReview(id, token);

    /* const updatingState = reviews.filter(
      (review) => review.id !== deletedReview.id
    );
    */

    // setReviews([...updatingState, deletedReview]);
    setReviews((previousReviews) =>
      previousReviews.filter((reviews) => reviews.id !== id)
    );
  };

  const handleCreateReview = async (
    title,
    review,
    productIdParam,
    customerUserId,
    guestId
  ) => {
    // console.log(`this is title -${title} this is review -${review}`);
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

  const handleDeleteClick = async (productId) => {
    const deletedProduct = await deleteProduct(productId, token);

    history.push(`/products`);

    setProducts((previousProducts) =>
      previousProducts.filter((products) => products.id !== productId)
    );
  };

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
              <article class="tile is-child notification is-white box">
                <p class="title has-text-centered">{singleProduct.title}</p>

                <figure className="has-text-centered">
                  <img src={singleProduct.img} width="400" height="500"></img>
                </figure>
                <p class="subtitle">{singleProduct.brand}</p>
                <p class="content">{singleProduct.description}</p>
                <p class="subtitle">{singleProduct.price}</p>

                <button
                  class="button is-info is-rounded"
                  onClick={(event) => {
                    event.preventDefault();
                    setLocalCart((localCart) => [
                      ...localCart,
                      individualProduct,
                    ]);
                  }}
                >
                  +Add
                </button>
                <div class="buttons has-addons is-justify-content-space-between">
                  {" "}
                  {token && adminUser ? (
                    <Link
                      to={`/updateProduct/${individualProduct.id}`}
                      className="link"
                    >
                      <button class="button is-success">Edit</button>
                    </Link>
                  ) : null}
                  {token && adminUser ? (
                    <button
                      onClick={() => handleDeleteClick(singleProduct.id)}
                      class="button is-danger"
                    >
                      Delete
                    </button>
                  ) : null}
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
              event.preventDefault();
              handleCreateReview(title, review, productIdParam);
              setTitle("");
              setReview("");
              history.push(`/product/${individualProduct.id}`);
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

          {reviews.map((individualReview) => {
            return (
              <>
                {productIdParam == individualReview.productId ? (
                  <div className="title is-ancestor box">
                    <h1 className="title">{individualReview.title}</h1>

                    <p className="subtitle">{individualReview.review}</p>
                    <div class="buttons has-addons is-justify-content-space-between">
                      {" "}
                      <Link
                        to={`/updateReview/${individualProduct.id}`}
                        className="link"
                      >
                        <button class="button is-light edit">Edit</button>
                      </Link>
                      <button
                        class="button is-danger is-light"
                        onClick={(event) => {
                          event.preventDefault();
                          handleDeleteReview(individualReview.id, token);
                          history.push(`/product/${individualProduct.id}`);
                        }}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ) : null}
              </>
            );
          })}
        </section>
      </>
    );
  }
};

export default ProductDetail;
