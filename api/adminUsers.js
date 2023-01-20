const apiRouter = require("express").Router();
require("dotenv").config();
// gets our secret files
const { JWT_SECRET } = process.env;

// requiring for hashing and checking passwords
const bcrypt = require("bcrypt");

// required to build web tokens
const jwt = require("jsonwebtoken");

const {
  getAllAdminUsers,
  getAdminUserById,
  getAdminUserByUsername,
  createAdminUser,
} = require("../db/adminUsers");

// GET /api/adminUsers
apiRouter.get("/", async (req, res) => {
  try {
    const adminUsers = await getAllAdminUsers();
    res.send(adminUsers);
  } catch (error) {
    next(error);
  }
});

// POST /api/adminUsers/login
apiRouter.post("/login", async (req, res, next) => {
  const { username } = req.body;
  try {
    const user = await getAdminUserByUsername(username);
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

// POST /api/adminUsers/register
apiRouter.post("/register", async (req, res, next) => {
  const { username, email, password } = req.body;
  try {
    const _user = await getAdminUserByUsername(username);
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
    const newUser = await createAdminUser({ username, email, password });
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

//api/adminUsers/me/:adminUserId
apiRouter.get("/me/:adminUserId", async (req, res, next) => {
  const adminId = req.params.adminUserId;

  const singleAdminUser = await getAdminUserById(adminId);

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
      res.send(singleAdminUser);
    }
  } catch (error) {
    next(error);
  }
});

module.exports = apiRouter;
