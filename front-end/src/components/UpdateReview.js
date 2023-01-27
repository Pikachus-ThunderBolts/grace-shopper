import { Route, Switch, Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { updateReview } from "../api/api";

const UpdateReview = ({ reviews, setReviews, individualProduct, token }) => {
  const history = useHistory();

  const { productIdParam } = useParams();
  const individualReview = reviews.find(
    (object) => object.id == productIdParam
  );

  const [reviewTitle, setReviewTitle] = useState(individualReview.title);
  const [review, setReview] = useState(individualReview.review);
  const [reviewProductId, setReviewProductId] = useState(
    individualReview.productId
  );
  const [reviewCustomerUserId, setReviewCustomerUserId] = useState(
    individualReview.customerUserId
  );
  const [reviewGuestUserId, setreviewGuestUserId] = useState(
    individualReview.guestUserId
  );

  const handleEditReview = async (
    id,
    reviewTitle,
    review,
    productIdParam,
    reviewCustomerUserId,
    reviewGuestUserId
  ) => {
    const updatedReview = await updateReview(
      id,
      reviewTitle,
      review,
      productIdParam,
      reviewCustomerUserId,
      reviewGuestUserId,
      token
    );

    const updatingState = reviews.filter(
      (review) => review.id !== updatedReview.id
    );

    setReviews([...updatingState, updatedReview]);

    return updatedReview;
  };

  return (
    <>
      <form
        className="section"
        onSubmit={async (event) => {
          event.preventDefault();

          handleEditReview(
            individualReview.id,
            reviewTitle,
            review,
            productIdParam,
            reviewCustomerUserId,
            reviewGuestUserId
          );

          setReviewTitle("");
          setReview("");
          setReviewProductId("");
          setReviewCustomerUserId("");
          setreviewGuestUserId("");

          history.push(`/product/${individualReview.id}`);
        }}
      >
        <section class="section">
          <h1 class="title">Update Review</h1>
        </section>
        <section class="section has-background-info">
          <div class="field">
            <label class="label has-text-white">Title</label>
            <div class="control">
              <input
                class="input"
                type="text"
                placeholder="Review Title"
                required
                autoComplete="off"
                value={reviewTitle}
                onChange={(event) => {
                  setReviewTitle(event.target.value);
                }}
              ></input>
            </div>
          </div>

          <div class="field">
            <label class="label has-text-white">Review</label>
            <div class="control">
              <input
                class="input"
                type="text"
                placeholder="Brand"
                required
                autoComplete="off"
                value={review}
                onChange={(event) => {
                  setReview(event.target.value);
                }}
              ></input>
            </div>
          </div>

          <div class="control">
            <button class="button is-primary">Update Review</button>
          </div>
        </section>
      </form>
    </>
  );
};

export default UpdateReview;
