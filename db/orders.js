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


async function getAllOrders() {
	try {
		const {rows } = await client.query(`
		SELECT *
		FROM orders;
		`
		);
		return rows;
	} catch (error) {
		console.error("Error getting all orders", error);
		throw error;
	}
};

async function getAllOrdersById(id) {
	try {
		const {
			rows: [order],
		} = await client.query(`
			SELECT *
			FROM orders
			WHERE id=$1;
		`, [id]
		);
		return order;
	} catch (error) {
		console.error("Error getting order by id", error)
		throw error;
	}
};

async function getOrderByTotal(total) {
	try {
		const {
			rows: [order],
		} = await client.query(`
		SELECT *
		FROM orders
		WHERE total=$1;
		`, [total]
		);
		return order;
	} catch (error) {
		console.error("Error getting order by total", error);
		throw error;
	}
}

async function getOrderByCustomerUserId(customerUserId) {
	try {
		const {
			rows: [order],
		} = await client.query(`
		SELECT *
		FROM orders
		WHERE "customerUserId" = $1
		`,
			[customerUserId]
		)
		return order
	} catch (error) {
		console.error("There was an error getting the order by the customerUserId")
		throw error;
	}
}

async function getOrderByGuestId(guestId) {
	try {
		const {
			rows: [order],
		} = await client.query(`
		SELECT *
		FROM orders
		WHERE "guestId" = $1
		`,
			[guestId]
		)
		return order
	} catch (error) {
		console.error("There was an error getting the order by the customerUserId")
		throw error;
	}
}

async function destroyOrder(id) {
	try {
	  const {
		rows: [order],
	  } = await client.query(
		`
		DELETE FROM orders
		WHERE orders.id=$1
		RETURNING *
	  `,
		[id]
	  );
	  return order;
	} catch (error) {
	  console.error("There was an error deleting the order", error);
	  throw error;
	}
  }


module.exports = {
	createOrder,
	getAllOrdersById,
	getOrderByTotal,
	getAllOrders,
	destroyOrder,
	getOrderByCustomerUserId,
	getOrderByGuestId,
};