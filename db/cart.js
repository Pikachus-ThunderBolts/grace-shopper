const client = require("./client");


async function createCart({productId, customerUserId, guestId}) {
  try {
    const {
      rows: [cart]
    } = await client.query(
      `
    INSERT INTO cart ("productId", "customerUserId", "guestId")
    VALUES ($1, $2, $3)
    RETURNING *;
    `, [productId, customerUserId, guestId]
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
    console.error("Error getting all carts", error);
  }
};

async function getAllCartsById({id}) {
  try {
    const {
      rows: [cart]
    } = await client.query(`
      SELECT *
      FROM cart
      WHERE id=$1
      RETURNING *;
    `, [id])
    return cart;
  } catch (error) {
    console.error()
  }
}

async function getCartByCustomerId({customerUserID}) {
  try {
    const {
      rows: [cart]
    } = await client.query(`
      SELECT *
      FROM cart 
      WHERE 
    `)
  } catch (error) {
    
  }
}

module.exports = {
  createCart,
  getAllCarts, 
  getAllCartsById, 

}