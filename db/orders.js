const client = require("./client");

async function createOrder({
	customerUserId,
	productId, 
	guestId,
	quantity,
	total,
}) {
	try {
		const {
			rows: [order],
		} = await client.query(
			`
		INSERT INTO	orders ("customerUserId", "productId", "guestId", quantity, total)
		VALUES ($1, $2, $3, $4, $5)
		RETURNING *
		`, 
		[customerUserId, productId, guestId, quantity, total]
		);
		return order;
	} catch (error) {
		console.error("Error creating the new order", error);
		throw error;
	}
};


module.exports = {
	createOrder,
};