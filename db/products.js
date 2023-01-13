const client = require("./client");

async function createNewProduct({
  brand,
  title,
  description,
  price,
  quantity,
  category,
  img,
}) {
  try {
    const {
      rows: [product],
    } = await client.query(
      `
    INSERT INTO products (brand, title, description, price, quantity, category, img)
    VALUES ($1, $2, $3, $4, $5, $6, $7)
    RETURNING *
    `,
      [brand, title, description, price, quantity, category, img]
    );
    return product;
  } catch (error) {
    console.log("Error creating new product", error);
    throw error;
  }
}

module.exports = {
  createNewProduct,
};
