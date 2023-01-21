const apiRouter = require('express').Router();

require("dotenv").config();

const { JWT_SECRET } = process.env;

const jwt = require("jsonwebtoken");

const {
  createCart,
  getAllCarts, 
  getAllCartsById, 
  getCartByCustomerId,
  getCartByGuestId,
  updateCart,
  destroyCartItem
} = require("../db/cart");

const {
  getAdminUserById,
} = require("../db/adminUsers");


//GET /api/cart
//Only admin can have access to get all the carts
apiRouter.get("/", async (req, res, next) => {
  try {
    const allCarts = await getAllCarts();
    if(!req.headers.authorization) {
      res.send({
        name: `AdminUserNotLoggedIn`,
        message: `Only adminUsers can see all carts`
      })
      return
    }
    const token = req.headers.authorization.slice(7);
    const signedIn = jwt.verify(token, JWT_SECRET);
    if(signedIn) {
      res.send(allCarts);
    }
  } catch (error) {
    next(error)
  }
});

//POST /api/cart
//Anyone can make a new cart
apiRouter.post("/", async (req, res, next) => {
  try {
    const {productId, customerUserId, guestId} = req.body;

    const newCartItem = await createCart({productId, customerUserId, guestId});
    res.send(newCartItem);
  } catch (error) {
    next(error)
  }
})

//GET /api/cart/customer/:customerUserId
//getting cart by customerUserId
apiRouter.get("/customer/:customerUserId", async (req, res, next) => {
  try {
      const {customerUserId} = req.params;

      const cartByCustomerUserId = await getCartByCustomerId(customerUserId);

      if(!req.headers.authorization) {
          res.send({
              name: `UserNotLoggedIn`,
              message: `Only User can view orders by customerUserId`,
          });
          return;
      }

      const token = req.headers.authorization.slice(7);
      const signedIn = jwt.verify(token, JWT_SECRET);

      if(signedIn) {
          res.send(cartByCustomerUserId)
      }
  } catch (error) {
      next(error);
  }
})

//GET /api/cart/guest/:guestId
//getting cart by guestId
apiRouter.get("/guest/:guestId", async (req, res, next) => {
  try {
      const {guestId} = req.params;

      const cartByguestId = await getCartByGuestId(guestId);

      if(!req.headers.authorization) {
          res.send({
              name: `UserNotLoggedIn`,
              message: `Only User can view orders by guestUserId`,
          });
          return;
      }

      const token = req.headers.authorization.slice(7);
      const signedIn = jwt.verify(token, JWT_SECRET);

      if(signedIn) {
          res.send(cartByguestId)
      }
  } catch (error) {
      next(error);
  }
})

//PATCH /api/cart/customer/:customerUserId
//editing cart by customerUserId
apiRouter.patch("/customer/:customerUserId", async (req, res, next) => {
  try {
    const { productId, customerUserId, guestId } = req.body;

    const update = await updateCart({
      id: req.params.customerUserId,
      productId,
      customerUserId,
      guestId
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

//PATCH /api/cart/guest/:guestId
//editing cart by guestId

//DELETE /api/cart/:productId

//DELETE /api/cart/customer/:customerUserId
//deleting cart by 

//DELETE /api/cart/guest/:guestId

module.exports = apiRouter;