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
  updateCartById,
  updateCartByCustomerUserId,
  updateCartByGuestId,
  destroyCartByCartId,
  destroyCartItemByCustomerUserId,
  destroyCartItemByGuestId,
  destroyCartItemByProductId,
} = require("../db/cart");

const {
  getAdminUserById,
} = require("../db/adminUsers");


//GET /api/cart
//Only admin can have access to get all the carts
apiRouter.get("/", async (req, res, next) => {
  try {
    const tokenParts = req.headers.authorization.split(" ");
    const signature = tokenParts[tokenParts.length-1];
    jwt.verify(signature, JWT_SECRET);
    const allCarts = await getAllCarts();
    res.send(allCarts);
    
  } catch (error) {
    res.send({
      name: `AdminUserNotLoggedIn`,
      message: `Only adminUsers can see all carts`
    })
    
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

//PATCH /api/cart/:cartId
//editing cart by cartId
apiRouter.patch("/:cartId", async (req, res, next) => {
  try {
    const { productId } = req.body;

    const update = await updateCartById({
      id: req.params.cartId,
      productId,
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

//PATCH /api/cart/customer/:customerUserId
//editing cart by customerUserId
apiRouter.patch("/customer/:customerUserId", async (req, res, next) => {
  try {
    const { productId } = req.body;

    const update = await updateCartByCustomerUserId({
      id: req.params.customerUserId,
      productId,
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
apiRouter.patch("/guest/:guestId", async (req, res, next) => {
  try {
    const { productId } = req.body;

    const update = await updateCartByGuestId({
      id: req.params.guestId,
      productId,
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

//DELETE /api/cart/:cartId
//deleting cart by cartId
apiRouter.delete("/:cartId", async (req, res, next) => {
  try {
    const cartId = req.params.cartId;
    
    const deletedCart = await destroyCartByCartId(cartId);
    
    if (!req.headers.authorization) {
      res.send({
        name: `UserNotLoggedIn`,
        message: `Only User can delete orders`,
      });
      return;
    }
    const token = req.headers.authorization.slice(7);
    const signedIn = jwt.verify(token, JWT_SECRET);
    if (signedIn) {
      res.send(deletedCart);
    }
  } catch (error) {
    next(error);
  }
});

//DELETE /api/cart/product/:productId
//deleting cart by productId
apiRouter.delete("/product/:productId", async (req, res, next) => {
  try {
    const productId = req.params.productId;
    
    const deletedCart = await destroyCartItemByProductId(productId);
    
    if (!req.headers.authorization) {
      res.send({
        name: `UserNotLoggedIn`,
        message: `Only User can delete orders`,
      });
      return;
    }
    const token = req.headers.authorization.slice(7);
    const signedIn = jwt.verify(token, JWT_SECRET);
    if (signedIn) {
      res.send(deletedCart);
    }
  } catch (error) {
    next(error);
  }
});

//DELETE /api/cart/customer/:customerUserId
//deleting cart by customerUserId
apiRouter.delete("/customer/:customerUserId", async (req, res, next) => {
  try {
    const customerUserId = req.params.customerUserId;
    
    const deletedCart = await destroyCartItemByCustomerUserId(customerUserId);
    
    if (!req.headers.authorization) {
      res.send({
        name: `UserNotLoggedIn`,
        message: `Only User can delete orders`,
      });
      return;
    }
    const token = req.headers.authorization.slice(7);
    const signedIn = jwt.verify(token, JWT_SECRET);
    if (signedIn) {
      res.send(deletedCart);
    }
  } catch (error) {
    next(error);
  }
});

//DELETE /api/cart/guest/:guestId
//deleting cart by guestId
apiRouter.delete("/guest/:guestId", async (req, res, next) => {
  try {
    const guestId = req.params.guestId;
    
    const deletedCart = await destroyCartItemByGuestId(guestId);
    
    if (!req.headers.authorization) {
      res.send({
        name: `UserNotLoggedIn`,
        message: `Only User can delete orders`,
      });
      return;
    }
    const token = req.headers.authorization.slice(7);
    const signedIn = jwt.verify(token, JWT_SECRET);
    if (signedIn) {
      res.send(deletedCart);
    }
  } catch (error) {
    next(error);
  }
});

module.exports = apiRouter;