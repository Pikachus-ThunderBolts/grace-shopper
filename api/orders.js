const apiRouter = require("express").Router();
require("dotenv").config();
// gets our secret files
const { JWT_SECRET } = process.env;

// requiring for hashing and checking passwords
const bcrypt = require("bcrypt");

// required to build web tokens
const jwt = require("jsonwebtoken");

const {
	createOrder,
	getAllOrdersById,
	getOrderByTotal,
	getAllOrders,
    destroyOrder,
    getOrderByCustomerUserId,
    getOrderByGuestId
} = require("../db/orders");

// GET /api/orders
apiRouter.get("/", async (req, res, next) => {
    try {
        const allOrders = await getAllOrders();
        res.send(allOrders);
    } catch (error) {
        next(error);
    }
});

//GET /api/orders/:orderId
apiRouter.get("/:orderId", async (req, res, next) => {
    try {
      const { orderId } = req.params;
      const singleOrder = await getAllOrdersById(orderId);
      res.send(singleOrder);
    } catch (error) {
      next(error);
    }
  });

//GET /api/orders/customer/:customerUserId
apiRouter.get("/customer/:customerUserId", async (req, res, next) => {
    try {
        const {customerUserId} = req.params;

        const orderByCustomerUserId = await getOrderByCustomerUserId(customerUserId);

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
            res.send(orderByCustomerUserId)
        }
    } catch (error) {
        next(error);
    }
})

//GET /api/orders/guest/:guestId
apiRouter.get("/guest/:guestId", async (req, res, next) => {
    try {
        const {guestId} = req.params;

        const orderByguestId = await getOrderByGuestId(guestId);

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
            res.send(orderByguestId)
        }
    } catch (error) {
        next(error);
    }
})

  //POST /api/orders
  //This POST route requires a token to make an order: 
  apiRouter.post("/", async (req, res, next) => {
    try {
      const { customerUserId, productId, guestId, quantity, total } = req.body;
  
      if (!req.headers.authorization) {
        res.send({
          name: `UserNotLoggedIn`,
          message: `Only User can make place an order`,
        });
        return;
      }
      const token = req.headers.authorization.slice(7);
      const signedIn = jwt.verify(token, JWT_SECRET);
      if (signedIn) {
        newOrder = await createOrder({
            customerUserId, 
            productId,
            guestId,
            quantity,
            total
        });
  
        res.send(newOrder);
      } 
    } catch (error) {
      next(error);
    }
  });

  //This POST route does NOT require a token to place an order:
//   apiRouter.post("/", async (req, res, next) => {
//     try {
//       const { customerUserId, productId, guestId, quantity, total } =
//         req.body;
  
      
//     newOrder = await createOrder({
//         customerUserId, 
//         productId,
//         guestId,
//         quantity,
//         total
//     });
  
//     res.send(newOrder);
    
//     } catch (error) {
//       next(error);
//     }
//   });

//No need for PATCH route, will not edit orders, simply make a new order

//DELETE /api/orders/:orderId
apiRouter.delete("/:orderId", async (req, res, next) => {
    try {
      const orderId = req.params.orderId;
  
      const deleteOrder = await destroyOrder(orderId);
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
        res.send(deleteOrder);
      }
    } catch (error) {
      next(error);
    }
  });

module.exports = apiRouter;