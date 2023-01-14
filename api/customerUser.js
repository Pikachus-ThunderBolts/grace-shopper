const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const { JWT_SECRET } = process.env;
const jwt = require("jsonwebtoken");

const {
  createCustomerUser,
  getCustomerUserByUsername,
  getCustomerUserById,
} = require("../db/customerUsers");

//Router.get
router.get("/", async (req, res) => {
  res.send("Test");
});

//Router.post
router.post("/login", async (req, res, next) => {
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

module.exports = router;
