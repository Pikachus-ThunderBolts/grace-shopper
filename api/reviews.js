const apiRouter = require("express").Router();

const {
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

module.exports = apiRouter;
