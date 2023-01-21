const client = require("./client");


async function createCart({
  productId, 
  customerUserId, 
  guestId
}) {
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
    const { rows } = await client.query(`
    SELECT *
    FROM cart
    `)
    return rows;
  } catch (error) {
    console.error("Error getting all carts", error);
    throw error;
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

async function getCartByCustomerId(customerUserId) {
  try {
    const {
      rows: [cart]
    } = await client.query(`
      SELECT *
      FROM cart 
      WHERE "customerUserId"=$1;
    `, [customerUserId])
    console.log("this is cart", cart)
    return cart;
  } catch (error) {
    console.error("Error getting cart by customer id", error)
    throw error;
  }
}

async function getCartByGuestId(guestId) {
  try {
    const {
      rows: [cart]
    } = await client.query(`
      SELECT *
      FROM cart 
      WHERE "guestId"=$1;
    `, [guestId])
    return cart;
  } catch (error) {
    console.error("Error getting cart by customer id", error)
    throw error;
  }
}

async function updateCartById({
  id, 
  productId,
  // customerUserId,
  // guestId
}) {
  try {
    const {
      rows: [cart],
    } = await client.query(`
    UPDATE cart
    SET
    "productId" = COALESCE($2, "productId")
    WHERE id=$1
    RETURNING *;
    `, [id, productId] 
    );
    return cart;
  } catch (error) {
    console.error("error updating cart", error);
    throw error;
  }
};

async function updateCartByCustomerUserId({
  id, 
  productId,
  // customerUserId,
  // guestId
}) {
  try {
    const {
      rows: [cart],
    } = await client.query(`
    UPDATE cart
    SET
    "productId" = COALESCE($2, "productId")
    WHERE "customerUserId"=$1
    RETURNING *;
    `, [id, productId] 
    );
    return cart;
  } catch (error) {
    console.error("error updating cart", error);
    throw error;
  }
};

async function updateCartByGuestId({
  id, 
  productId,
  // customerUserId,
  // guestId
}) {
  try {
    const {
      rows: [cart],
    } = await client.query(`
    UPDATE cart
    SET
    "productId" = COALESCE($2, "productId")
    WHERE "guestId"=$1
    RETURNING *;
    `, [id, productId] 
    );
    return cart;
  } catch (error) {
    console.error("error updating cart", error);
    throw error;
  }
};


async function destroyCartItem({id}) {
  try {
    const {
      rows: [cart]
    } = await client.query(`
    DELETE FROM cart
    WHERE id=$1
    RETURNING *
    `, [id] 
    );
    return cart;
  } catch (error) {
    console.error("error deleting cart", error)
    throw error;
  }
}


module.exports = {
  createCart,
  getAllCarts, 
  getAllCartsById, 
  getCartByCustomerId,
  getCartByGuestId,
  updateCartById,
  destroyCartItem,
  updateCartByCustomerUserId,
  updateCartByGuestId,
}