const apiRouter = require("express").Router();
const bcrypt = require("bcrypt");
const { JWT_SECRET } = process.env;
const jwt = require("jsonwebtoken");

const { getAllAdminUsers } = require("../db/adminUsers");

//Router.get
apiRouter.get("/", async (req, res) => {
  try {
    const adminUsers = await getAllAdminUsers();
    res.send(adminUsers);
  } catch (error) {
    next(error);
  }
});

module.exports = apiRouter;
