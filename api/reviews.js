const apiRouter = require("express").Router();

const {
  createNewReview,
  getAllReviews,
  getAllReviewsById,
  getReviewByCustomerUserId,
  getReviewByGuestId,
  getReviewByTitle,
  updateReview,
  destroyReview,
} = require("../db/reviews");

apiRouter.get("/", async (req, res, next) => {
  try {
    const allReviews = await getAllReviews();
    res.send(allReviews);
  } catch (error) {
    next(error);
  }
});

/* apiRouter.post("/", async (req, res, next) => {
  try {
    const { title, review } = req.body;
    const existingReview = await getReviewByTitle(title);
    if (existingReview) {
      next({
        name: "ReviewExistsError",
        message: `A review with name ${title} already exists`,
      });
    } else {
      const createdReview = createNewReview({ title, review });
      if (createdReview) {
        res.send(createdReview);
      }
      console.log("createdReviews", createdReview);
    }
  } catch (error) {
    next(error);
  }
});

*/

apiRouter.post("/", async (req, res, next) => {
  try {
    const { title, review, customerUserId, productId, guestId } = req.body;
    const newReview = await createNewReview({
      title,
      review,
      customerUserId,
      productId,
      guestId,
    });
    console.log("newReview", newReview);
    res.send(newReview);
  } catch (error) {
    next(error);
  }
});

apiRouter.patch("/:reviewId", async (req, res, next) => {
  try {
    const { review, title, customerUserId, productId, guestId } = req.body;
    const update = await updateReview({
      id: req.params.reviewId,
      title: title,
      review: review,
      customerUserId: customerUserId,
      productId: productId,
      guestId: guestId,
    });
    console.log(update, "update");

    res.send(update);
  } catch (error) {
    next(error);
  }
});

apiRouter.delete("/:reviewId", async (req, res, next) => {
  try {
    const reviewId = req.params.reviewId;
    //const {} = req.body;
    const deleteReview = await destroyReview(reviewId);

    res.send(deleteReview);
  } catch (error) {
    next(error);
  }
});

module.exports = apiRouter;
