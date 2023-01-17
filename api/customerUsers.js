const apiRouter = require("express").Router();
// const bcrypt = require("bcrypt");
// const { JWT_SECRET } = process.env;
// const jwt = require("jsonwebtoken");

const {
  // createCustomerUser,
  getAllCustomerUsers,
  getCustomerUserByUsername,
  // getCustomerUserById,
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
  const { username, password } = req.body;

  if (!username || !password) {
    next({
      name: "MissingCredentialsError",
      message: "Missing username or password",
    });
  }
  try {
    const user = getCustomerUserByUsername(username);
    bcrypt.compare(password, user.password, (error) => {
      if (error) {
        next({
          name: "UserAuthenticationError",
          message: "username or password was incorrect",
        });
      } else {
        const token = jwt.sign(
          {
            id: user.id,
            username,
          },
          JWT_SECRET,
          { expiresIn: "1w" }
        );
        res.json({
          message: "you're logged in!",
          token,
          user: { id: user.id, username },
        });
      }
    });
  } catch ({ name, message }) {
    next({ name, message });
  }
});

// route.post.register
// apiRouter.post("/register", async (req, res, next) => {
//   const { username, password } = req.body;
//   try {
//     const userRegister = await getCustomerUserByUsername(username);

//     if (userRegister) {
//       res.send({
//         error: `User ${username} is already taken.`,
//         name: "UserDuplicated",
//         message: `User ${username} is already taken.`,
//       });
//     }
//     if (password.length < 6) {
//       res.send({
//         error: "Password Too Short!",
//         name: "PasswordLengthError",
//         message: "Password Too Short!",
//       });
//     }
//     const { id } = await createCustomerUser({ username, password });

//     const token = jwt.sign(
//       {
//         id: id,
//         username,
//       },
//       JWT_SECRET,
//       { expiresIn: "1w" }
//     );

//     res.json({
//       message: "success",
//       token,
//       user: { id: id, username },
//     });
//   } catch ({ name, message }) {
//     next({ name, message });
//   }
// });

// api/customerUsers/:username/cart

//api/customerUsers/me
//placedOrders
//reviews

module.exports = apiRouter;
