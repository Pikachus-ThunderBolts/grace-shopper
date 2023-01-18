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

module.exports = {
  createCart,
}