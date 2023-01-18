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

apiRouter.post("/", async (req, res, next) => {
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

module.exports = apiRouter;
