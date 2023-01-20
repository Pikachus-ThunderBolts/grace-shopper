const apiRouter = require("express").Router();
require("dotenv").config();
const { JWT_SECRET } = process.env;
const jwt = require("jsonwebtoken");

const {
  getAllCustomerUsers,
  getCustomerUserByUsername,
  createCustomerUser,
  getCustomerUserById,
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

//api/customerUsers/me/:customerUserId
apiRouter.get("/me/:customerUserId", async (req, res, next) => {
  const customerId = req.params.customerUserId;

  const singleCustomerUser = await getCustomerUserById(customerId);

  const auth = req.headers.authorization;
  try {
    if (!auth) {
      res.send({
        error: "You must be logged in to perform this action",
        message: "You must be logged in to perform this action",
        name: "InvalidCredentialsError",
      });
      return;
    }
    const token = auth.slice(7);

    const signedIn = jwt.verify(token, JWT_SECRET);
    if (signedIn) {
      res.send(singleCustomerUser);
    }
  } catch (error) {
    next(error);
  }
});

// "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im1pdGNoZWw5NCIsImlhdCI6MTY3NDE0ODAzMSwiZXhwIjoxNjc0NzUyODMxfQ.G4dsILWQgNGAQ7z5uPtb3zUXdZAd5NvqKJse6PC0-X8",
//     "user": {
//         "id": 7,
//         "username": "mitchel94",
//         "email": "mitchel@email.com"
//         "password" : "password123"

// api/customerUsers/:username/cart
//placedOrders
//reviews

module.exports = apiRouter;
