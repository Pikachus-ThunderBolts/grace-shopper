const apiRouter = require("express").Router();

require("dotenv").config();

const { JWT_SECRET } = process.env;

const jwt = require("jsonwebtoken");

const {
  createNewProduct,
  getAllProductsById,
  getAllProducts,
  getProductsByPrice,
  updateProduct,
  destroyProduct,
  getProductsByCategory,
  getProductsByTitle,
  getProductsByBrand,
} = require("../db/products");

// GET /api/products
apiRouter.get("/", async (req, res, next) => {
  try {
    const allProducts = await getAllProducts();
    res.send(allProducts);
  } catch (error) {
    next(error);
  }
});

// GET /api/products/:productId
apiRouter.get("/:productId", async (req, res, next) => {
  try {
    const { productId } = req.params;
    const singleProduct = await getAllProductsById(productId);
    res.send(singleProduct);
  } catch (error) {
    next(error);
  }
});

/*

username: admin99
id: 2
email: admin99@gmail.com
password: admin99password
token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwidXNlcm5hbWUiOiJhZG1pbjk5IiwiaWF0IjoxNjc0MDcxMjIyfQ.AkIDJyJfQ09CdzI9RDtvnnrMOq5OqHbDywSQR6twe6I

*/

// POST /api/products
apiRouter.post("/", async (req, res, next) => {
  try {
    const { brand, title, description, price, quantity, category, img } =
      req.body;
    const existingProduct = await getProductsByTitle(title);

    if (!req.headers.authorization) {
      res.send({
        name: `AdminuserNotLoggedIn`,
        message: `Only adminUser can make new products`,
      });
      return;
    }
    const token = req.headers.authorization.slice(7);
    const signedIn = jwt.verify(token, JWT_SECRET);
    if (signedIn && existingProduct) {
      res.send({
        name: "ProductExistsError",
        message: `A product with the title ${title} already exists`,
      });
    } else {
      newProduct = await createNewProduct({
        brand,
        title,
        description,
        price,
        quantity,
        category,
        img,
      });

      res.send(newProduct);
    }
  } catch (error) {
    next(error);
  }
});

// PATCH /api/products/:productId
//gets product by id to be able to update product
apiRouter.patch("/:productId", async (req, res, next) => {
  try {
    const { brand, title, description, price, quantity, category, img } =
      req.body;

    const update = await updateProduct({
      id: req.params.productId,
      brand,
      title,
      description,
      price,
      quantity,
      category,
      img,
    });

    if (!req.headers.authorization) {
      res.send({
        name: `AdminuserNotLoggedIn`,
        message: `Only adminUser can make update products`,
      });
      return;
    }
    const token = req.headers.authorization.slice(7);
    const signedIn = jwt.verify(token, JWT_SECRET);
    if (signedIn) {
      res.send(update);
    }
  } catch (error) {
    next(error);
  }
});

//DELETE /api/products/:productId
apiRouter.delete("/:productId", async (req, res, next) => {
  try {
    const productId = req.params.productId;

    const deleteProduct = await destroyProduct(productId);
    if (!req.headers.authorization) {
      res.send({
        name: `AdminuserNotLoggedIn`,
        message: `Only adminUser can delete products`,
      });
      return;
    }
    const token = req.headers.authorization.slice(7);
    const signedIn = jwt.verify(token, JWT_SECRET);
    if (signedIn) {
      res.send(deleteProduct);
    }
  } catch (error) {
    next(error);
  }
});

module.exports = apiRouter;
