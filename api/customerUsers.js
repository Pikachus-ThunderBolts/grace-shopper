const apiRouter = require("express").Router();
require("dotenv").config();
const { JWT_SECRET } = process.env;
const jwt = require("jsonwebtoken");

const {
  getAllCustomerUsers,
  getCustomerUserByUsername,
  createCustomerUser,
} = require("../db/customerUsers");

//Router.get
apiRouter.get("/", async (req, res) => {
  try {
    const customerUsers = await getAllCustomerUsers();
    res.send(customerUsers);
  } catch (error) {
    next(error);
  }
});

//Router.post/login

apiRouter.post("/login", async (req, res, next) => {
  const { username } = req.body;
  try {
    const user = await getCustomerUserByUsername(username);
    const token = jwt.sign(
      {
        id: user.id,
        username: user.username,
      },
      JWT_SECRET
    );

    res.send({
      token,
      user: user,
      message: "you're logged in!",
    });
  } catch (error) {
    next(error);
  }
});

// route.post.register;
apiRouter.post("/register", async (req, res, next) => {
  const { username, email, password } = req.body;
  try {
    const _user = await getCustomerUserByUsername(username);
    if (_user) {
      res.send({
        error: `user ${username} is already taken`,
        name: "UsernameDuplicate",
        message: `User ${username} is already taken`,
      });
      return;
    } else if (password.length < 6) {
      res.send({
        error: "Password Too Short!",
        name: "PasswordLengthError",
        message: "Password Too Short!",
      });
      return;
    }
    const newUser = await createCustomerUser({ username, email, password });
    const token = jwt.sign(
      {
        username,
      },
      JWT_SECRET,
      { expiresIn: "1w" }
    );

    res.send({
      message: "New user created successfully.",
      token: token,
      user: newUser,
    });
  } catch (error) {
    next(error);
  }
});

// api/customerUsers/:username/cart
//api/customerUsers/me
//placedOrders
//reviews

module.exports = apiRouter;
