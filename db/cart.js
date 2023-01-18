const client = require("./client");


async function createCart({productId}) {
  try {
    const {
      rows: [cart]
    } = await client.query(
      `
    INSERT INTO cart ("productId")
    VALUES ($1)
    RETURNING *;
    `, [productId]
    );
    return cart;
  } catch (error) {
    console.error("Error creating cart", error);
    throw error;
  }
}

async function getAllCarts() {
  try {
    const {
      rows: [cart]
    } = await client.query(`
    SELECT *
    FROM cart
    `)
    return cart;
  } catch (error) {
    console.error("Error getting all carts")
  }
}

module.exports = {
  createCart,
  getAllCarts
}