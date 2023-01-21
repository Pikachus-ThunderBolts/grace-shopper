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
apiRouter.post("/", async (req, res, next) => {
  try {
    const {productId, customerUserId, guestId} = req.body;

    const newCartItem = await createCart({productId, customerUserId, guestId});
    res.send(newCartItem);
  } catch (error) {
    next(error)
  }
})

module.exports = apiRouter;