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
    console.error("Error getting carts by id", error)
    throw error;
  }
}

async function getCartByCustomerId({customerUserId}) {
  try {
    const {
      rows: [cart]
    } = await client.query(`
      SELECT *
      FROM cart 
      WHERE customerUserId=$1;
    `, [customerUserId])
    return cart;
  } catch (error) {
    console.error("Error getting cart by customer id", error)
    throw error;
  }
}

async function getCartByGuestId({guestId}) {
  try {
    const {
      rows: [cart]
    } = await client.query(`
      SELECT *
      FROM cart 
      WHERE guestId=$1;
    `, [guestId])
    return cart;
  } catch (error) {
    console.error("Error getting cart by customer id", error)
    throw error;
  }
}


module.exports = {
  createCart,
  getAllCarts, 
  getAllCartsById, 
  getCartByCustomerId,
  getCartByGuestId,

}