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
    console.error("Error creating new product", error);
    throw error;
  }
}

async function getAllProductsById(id) {
  try {
    const {
      rows: [product],
    } = await client.query(
      `
      SELECT *
      FROM products
      WHERE id=$1;
      `,
      [id]
    );
  } catch (error) {
    console.error("There was an error getting the product by Id", error);
    throw error;
  }
}

async function getAllProducts() {
  try {
    const {rows} = await client.query(`
    SELECT *
    FROM products;
    `);
    console.log(rows, "here are the rows")
    console.log("look here")
    return rows;
  } catch (error) {
    console.error("There was an error getting all the products", error)
    throw error;
  }
}

async function getProductsByPrice(price) {
  try {
    const {
      rows: [product],
    } = await client.query(`
    SELECT *
    FROM products
    WHERE price = $1;
    `)
    return product;
  } catch (error) {
    console.error("There was an error getting the product by price", error);
    throw error;
  }
}

async function updateProduct({id, brand, title, description, price, quantity, category, img}) {
  try {
    const {
      rows: [product],
    } = await client.query(`
    UPDATE products
    SET
    brand = COALESCE($2, brand),
    title = COALESCE($3, title),
    description = COALESCE($4, brand),
    price = COALESCE($5, brand),
    quantity = COALESCE($6, brand),
    category = COALESCE($7, brand),
    img = COALESCE($8, brand)
    WHERE id=$1
    RETURNING *;
    `,
    [id, brand, title, description, price, quantity, category, img]
    );
    return product
  } catch (error) {
    console.error("There was an error updating the product", error)
    throw error;
  }
}

console.log('This console.log is not in a function')

async function destroyProduct(id) {
  try {
    const{
      rows: [product]
    } = await client.query(`
      DELETE FROM products
      WHERE products.id=$1
      RETURNING *
    `, [id])
    return product
  } catch (error) {
    console.error("There was an error deleting the product", error)
    throw error
  }
}

module.exports = {
  createNewProduct,
  getAllProductsById,
  getAllProducts,
  getProductsByPrice,
  updateProduct,
  destroyProduct,
};
