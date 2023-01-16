const apiRouter = require('express').Router();

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

// POST /api/products
// apiRouter.post('/', async(req, res, next) => {
//     const token = req.headers.authorization.slice(7);
//     // const signedIn = jwt.verify(token);
//     try {
//         const {brand, title, description, price, quantity, category, img} = req.body;
//         const creatorId = req.user.id;
//         const productData = {creatorId, brand, title, description, price, quantity, category, img};
//         const existingProduct = await getProductsByTitle({title});
        

//         if(existingProduct) {
//             next({
//                 name: `ProductExistsError`,
//                 message: `A product with title ${title} already exists`
//             })
//         } else {
//             const newProduct = await createNewProduct({productData});
//             if(newProduct) {
//                 res.json(newProduct)
//                 res.send(newProduct)
//             }
//         }
//     } catch (error) {
//         next(error);
//     }
// })


// apiRouter.post('/', async(req, res, next) => {
//     try {
//         const {brand, title, description, price, quantity, category, img} = req.body;
//         const existingProduct = await getProductsBytitle(title);
//         if(existingProduct) {
//             next({
//                 name: `ProductExistsError`,
//                 message: `A product with title ${title} already exists`
//             })
//         } else {
//             const createdProduct = await createdProduct({brand, title, description, price, quantity, category, img});
//             if(createdProduct) {
//                 res.send(createdProduct)
//             }
//         }
//     } catch (error) {
//         next(error);
//     }
// })

module.exports = apiRouter;