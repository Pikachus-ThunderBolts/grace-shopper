const apiRouter = require('express').Router();

apiRouter.get('/', (req, res, next) => {
  res.send({
    message: 'API is under construction!',
  });
});

apiRouter.get('/health', (req, res, next) => {
  res.send({
    healthy: true,
  });
});

// place your routers here

// ROUTER: /api/customerUsers
// const customerUsersRouter = require("./customerUsers");
// router.use("/customerUsers", customerUsersRouter);

// ROUTER: /api/adminUsers
// const adminUsersRouter = require("./adminUsers");
// apiRouter.use("/adminUsers", adminUsersRouter);

// ROUTER: /api/guestUser
// const guestUserRouter = require("./guestUser");
// apiRouter.use("/guestUser", guestUserRouter);

// ROUTER: /api/cart
// const cartRouter = require("./cart");
// apiRouter.use("/cart", cartRouter);

// ROUTER: /api/orders
// const ordersRouter = require("./orders");
// apiRouter.use("/orders", ordersRouter);

// ROUTER: /api/products
const productsRouter = require("./products");
apiRouter.use("/products", productsRouter);

// ROUTER: /api/reviews
// const reviewsRouter = require("./reviews");
// apiRouter.use("/reviews", reviewsRouter);

module.exports = apiRouter;
