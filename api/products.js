const apiRouter = require('express').Router();

// const { unstable_renderSubtreeIntoContainer } = require('react-dom');
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

const {
    getAdminUserById,
} = require("../db/adminUsers");
const { Router } = require('express');

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
apiRouter.post('/', async(req,res,next) => {
    try {
        
            next({
                error: `NotLoggedInError`,
                message: `Unauthorized User Error`,
                name: `You must be logged in`
            })
        
            const {brand, title, description, price, quantity, category, img} = req.body;

            const newProduct = await createNewProduct({brand, title, description, price, quantity, category, img})
            res.send(newProduct)
        
    } catch (error) {
        next(error)
    }
})

// apiRouter.post('/', async(req,res,next) => {
//     try {
//         if(!req.user) {
//             next({
//                 error: `NotLoggedInError`,
//                 message: `Unauthorized User Error`,
//                 name: `You must be logged in`
//             })
//         } else {
//             const {brand, title, description, price, quantity, category, img} = req.body;

//             const newProduct = await createNewProduct({brand, title, description, price, quantity, category, img})
//             res.send(newProduct)
//         }
//     } catch (error) {
//         next(error)
//     }
// })

// apiRouter.post('/', async(req, res, next) => {
//     try {
//         if(req.user) {
//             const adminId = await getAdminUserById(adminUserId);
//             const {brand, title, description, price, quantity, category, img} = req.body;
//             const newProduct = await createNewProduct({adminId, brand, title, description, price, quantity, category, img});

//             if(newProduct) {
//                 res.send(newProduct);
//             }else {
//                 res.status(401);
//                 next({
//                     name: `FailedToMakeNewProductError`,
//                     message: `Cannot create new product`
//                 })
//             }
//         }
//     } catch (error) {
//         next (error);
//     }
// })    


// apiRouter.post('/', async(req, res, next) => {
//     const token = req.headers.authorization.slice(7);
//     const adminId = await getAdminUserById(adminUserId)
//     // const signedIn = jwt.verify(token);
//     try {
//         const {brand, title, description, price, quantity, category, img} = req.body;
//         const creatorId = req.user.id;
//         const productData = {creatorId, brand, title, description, price, quantity, category, img};

//         const existingProduct = await getProductsByTitle(title);
        

//         if(existingProduct) {
//             next({
//                 name: `ProductExistsError`,
//                 message: `A product with title ${title} already exists`
//             })
//         } else {
//             const newProduct = await createNewProduct(productData);
//             if(newProduct) {
//                 res.json(newProduct)
//                 res.send(newProduct)
//             }
//         }
//     } catch ({name, message}) {
//         next({name, message});
//     }
// })


// PATCH /api/products/:productId
//gets product by id to be able to update product
apiRouter.patch("/:productId", async(req, res, next) => {
    try {
        const {brand, title, description, price, quantity, category, img} = req.body;

        const update = await updateProduct({
            id: req.params.productId,
            brand: brand,
            title: title,
            description: description,
            price: price,
            quantity, category, img
        })

        console.log(update, "this is update const")
        res.send(update);
    } catch (error) {
        next(error)
    }
})


// apiRouter.patch("/:productId", async (req, res, next) => {
//     if(!req.user)
//     res.status(401).send({
//         name: `InvalidCredentialError`,
//         message: `You must be logged in to perform this action`,
//     });
//     try {
//         const {brand, title, description, price, quantity, category, img} = req.body;
//         const adminId = req.user.id;
//         const productData = {adminId, brand, title, description, price, quantity, category, img};
//         const newProduct = await createNewProduct(productData);
//         res.json(newProduct);
//         res.send(newProduct);
//     } catch ({name, message}) {
//         next({name, message});
//     }
// });

//DELETE /api/products/:productId
// apiRouter.delete("/:productId", async(req, res, next) => {
//     try {
//         const productId = await getAllProductsById(req.params.id);
        
//         const deleteProduct = await destroyProduct(productId);
//         res.send(deleteProduct);
//     } catch (error) {
//         next(error);
//     }
// })
// 

module.exports = apiRouter;