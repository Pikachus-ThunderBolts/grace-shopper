const apiRouter = require('express').Router();

const {
    createNewProduct,
    getAllProductsById,
    getAllProducts,
    getProductsByPrice,
    updateProduct,
    destroyProduct,
    getProductByCategory,
    getProductByTitle,
    getProductByBrand,
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

module.exports = apiRouter;