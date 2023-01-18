const client = require("./client");

async function createNewReview({
  title,
  review,
  customerUserId,
  productId,
  guestId,
}) {
  try {
    const {
      rows: [reviews],
    } = await client.query(
      `
        INSERT INTO reviews (title, review, "customerUserId", "productId", "guestId")
        VALUES ($1, $2, $3, $4, $5)
        RETURNING *
        `,
      [title, review, customerUserId, productId, guestId]
    );
    return reviews;
  } catch (error) {
    console.error("There was an error creating a review", error);
    throw error;
  }
}

async function getAllReviewsById(id) {
  try {
    const {
      rows: [reviews],
    } = await client.query(
      `
        SELECT *
        FROM reviews
        WHERE id=$1;
        `,
      [id]
    );
    return reviews;
  } catch (error) {
    console.error("There was an error getting review by id", error);
    throw error;
  }
}

async function getAllReviews() {
  try {
    const { rows } = await client.query(`
        SELECT *
        FROM reviews;
        `);
    return rows;
  } catch (error) {
    console.error("There was an error getting all reviews", error);
    throw error;
  }
}

async function getReviewByTitle(title) {
  try {
    const {
      rows: [reviews],
    } = await client.query(`
        SELECT *
        FROM reviews
        WHERE title = $1;
        `);
    return reviews;
  } catch (error) {
    console.error("There was an error getting the review by title", error);
    throw error;
  }
}

async function getReviewByCustomerUserId(customerUserId) {
  try {
    const {
      rows: [reviews],
    } = await client.query(`
        SELECT *
        FROM reviews
        WHERE customerUserId = $1;
        `);
    return reviews;
  } catch (error) {
    console.error(
      "There was an error getting the review by customer User Id",
      error
    );
    throw error;
  }
}

async function getReviewByGuestId(guestId) {
  try {
    const {
      rows: [reviews],
    } = await client.query(`
        SELECT *
        FROM reviews
        WHERE guestId = $1;
        `);
    return reviews;
  } catch (error) {
    console.error("There was an error getting the review by guest Id", error);
    throw error;
  }
}

async function updateReview({
  id,
  title,
  review,
  customerUserId,
  productId,
  guestId,
}) {
  try {
    const {
      rows: [reviews],
    } = await client.query(
      `
        UPDATE reviews
        SET
        title = COALESCE($2, title),
        review = COALESCE($3, review),
        "customerUserId" = COALESCE($4, "customerUserId"),
        "productId" = COALESCE($5, "productId"),
        "guestId" = COALESCE($6, "guestId")
        WHERE id=$1
        RETURNING *;
        `,
      [id, title, review, customerUserId, productId, guestId]
    );
    return reviews;
  } catch (error) {
    console.error("There was an error updating the review", error);
    throw error;
  }
}

async function destroyReview(id) {
  try {
    const {
      rows: [reviews],
    } = await client.query(
      `
        DELETE FROM reviews
        WHERE reviews.id=$1
        RETURNING *
      `,
      [id]
    );
    return reviews;
  } catch (error) {
    console.error("There was an error deleting the review", error);
    throw error;
  }
}

module.exports = {
  createNewReview,
  getAllReviewsById,
  getAllReviews,
  getReviewByTitle,
  getReviewByCustomerUserId,
  getReviewByGuestId,
  updateReview,
  destroyReview,
};
