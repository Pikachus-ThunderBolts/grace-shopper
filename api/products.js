const apiRouter = require('express').Router();

require('dotenv').config();
// gets our secret files
// const { JWT_SECRET } = process.env;
// console.log(process.env.JWT_SECRET, "here is secret");

// // requiring for hashing and checking passwords
// const bcrypt = require("bcrypt");

// required to build web tokens
const { jwt } = require("jsonwebtoken");

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

/*

username: admin99
email: admin99@gmail.com
password: admin99password
token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwidXNlcm5hbWUiOiJhZG1pbjk5IiwiaWF0IjoxNjc0MDcxMjIyfQ.AkIDJyJfQ09CdzI9RDtvnnrMOq5OqHbDywSQR6twe6I

*/

// POST /api/products
//This works:
// apiRouter.post('/', async(req, res, next) => {
//     try {
//       const {brand, title, description, price, quantity, category, img} = req.body;

//       const existingProduct = await getProductsByTitle(title);
//         if (existingProduct) {
//           res.send({
//             name: 'ProductExistsError',
//             message: `A product with the title ${title} already exists`
//           })
//         } else {
//             newProduct = await createNewProduct({brand, title, description, price, quantity, category, img});
            
//             res.send(newProduct)
//         } 
//     } catch (error) {
//       next(error);
//     }
//   })


  apiRouter.post('/', async(req, res, next) => {
    try {
      
        
      const token = req.headers.authorization.slice(7);
        
      const signedIn = jwt.verify(token);
      const existingProduct = await getProductsByTitle(title);
      
      const {brand, title, description, price, quantity, category, img} = req.body;

      if(!signedIn) {
        res.send({
            name: `AdminuserNotLoggedIn`,
            message: `Only adminUser can make new products`
        })
      } else if (existingProduct) {
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
            brand,
            title,
            description,
            price,
            quantity, 
            category, 
            img
        })

        console.log(update, "this is update const")
        res.send(update);
    } catch (error) {
        next(error)
    }
})

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