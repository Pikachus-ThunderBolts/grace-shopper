const apiRouter = require('express').Router();
const { Router } = require('express');

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


//GET /api/carts
apiRouter.get("/", async (req, res, next) => {
  try {
    const allCarts = await getAllCarts();
    res.send(allCarts);
  } catch (error) {
    next(error)
  }
});

//POST /api/carts
apiRouter.post("/", async (req, res, next) => {
  try {
    const {productId, customerUserId, guestId} = req.body;

    const newCartItem = await createCart({productId, customerUserId, guestId});
    res.send(newCartItem);
  } catch (error) {
    next(error)
  }
})