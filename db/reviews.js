const client = require("./client");

async function createNewReview({
    title, review, customerUserId, productId, guestId
}) {
    try {
        const {
            rows: [reviews],
        } = await client.query(`
        INSERT INTO reviews (title, review, "customerUserId", "productId", "guestId")
        VALUES ($1, $2, $3, $4, $5)
        RETURNING *
        `, [title, review, customerUserId, productId, guestId]);
        return reviews;
    } catch (error) {
        console.error("There was an error creating a review", error)
        throw error;
    }
}


module.exports = {
    createNewReview,
}