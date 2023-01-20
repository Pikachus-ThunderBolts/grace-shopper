const apiRouter = require('express').Router();

require('dotenv').config();
// gets our secret files
const { JWT_SECRET } = process.env;
// console.log(process.env.JWT_SECRET, "here is secret");

// // requiring for hashing and checking passwords
// const bcrypt = require("bcrypt");

// required to build web tokens
const  jwt  = require("jsonwebtoken");

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
const { getReviewByCustomerUserId } = require('../db');

// GET /api/products
apiRouter.get("/", async (req, res, next) => {
    try {
        const allProducts = await getAllProducts();
        res.send(allProducts);

    } catch (error) {
        next(error);
    }
});

/*

username: admin99
email: admin99@gmail.com
password: admin99password
token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwidXNlcm5hbWUiOiJhZG1pbjk5IiwiaWF0IjoxNjc0MDcxMjIyfQ.AkIDJyJfQ09CdzI9RDtvnnrMOq5OqHbDywSQR6twe6I

*/

// POST /api/products
  apiRouter.post('/', async(req, res, next) => {
    try {
      
      const {brand, title, description, price, quantity, category, img} = req.body;
      const existingProduct = await getProductsByTitle(title);

      if(!req.headers.authorization) {
        res.send({
            name: `AdminuserNotLoggedIn`,
            message: `Only adminUser can make new products`
        })
        return
      }
    const token = req.headers.authorization.slice(7);
    const signedIn = jwt.verify(token, JWT_SECRET);
      if(signedIn && existingProduct) {
        res.send({
            name: 'ProductExistsError',
            message: `A product with the title ${title} already exists`
          })
      } else {
            newProduct = await createNewProduct({brand, title, description, price, quantity, category, img});
            
            res.send(newProduct)
        } 
    } catch (error) {
      next(error);
    }
  })

// PATCH /api/products/:productId
//gets product by id to be able to update product
apiRouter.patch("/:productId", async(req, res, next) => {
    try {
        const {brand, title, description, price, quantity, category, img} = req.body;

        const update = await updateProduct({
            id: req.params.productId,
            brand,
            title,
            description,
            price,
            quantity, 
            category, 
            img
        })

        if(!req.headers.authorization) {
            res.send({
                name: `AdminuserNotLoggedIn`,
                message: `Only adminUser can make new products`
            })
            return
          }
        const token = req.headers.authorization.slice(7);
        const signedIn = jwt.verify(token, JWT_SECRET);
          if(signedIn) {
            newProduct = await createNewProduct({brand, title, description, price, quantity, category, img});
            console.log("update", update)
            res.send(update)
          } 
    } catch (error) {
        next(error)
    }
})

//This patch works:
// apiRouter.patch("/:productId", async(req, res, next) => {
//     try {
//         const {brand, title, description, price, quantity, category, img} = req.body;

//         const update = await updateProduct({
//             id: req.params.productId,
//             brand,
//             title,
//             description,
//             price,
//             quantity, 
//             category, 
//             img
//         })

//         console.log(update, "this is update const")
//         res.send(update);
//     } catch (error) {
//         next(error)
//     }
// })

//DELETE /api/products/:productId
apiRouter.delete("/:productId", async(req, res, next) => {
    try {
        const productId = req.params.productId
        
        const deleteProduct = await destroyProduct(productId);
        res.send(deleteProduct);
    } catch (error) {
        next(error);
    }
})


module.exports = apiRouter;