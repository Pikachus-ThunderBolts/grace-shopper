const apiRouter = require("express").Router();
require('dotenv').config();
// gets our secret files
const { JWT_SECRET } = process.env;
console.log(process.env.JWT_SECRET, "here is secret");

// requiring for hashing and checking passwords
const bcrypt = require("bcrypt");

// required to build web tokens
const jwt = require("jsonwebtoken");




const { getAllAdminUsers, getAdminUserById, getAdminUserByUsername } = require("../db/adminUsers");

//Router.get
apiRouter.get("/", async (req, res) => {
  try {
    const adminUsers = await getAllAdminUsers();
    res.send(adminUsers);
  } catch (error) {
    next(error);
  }
});

apiRouter.post("/login", async (req, res, next) => {
  const { username } = req.body;
  try {
    const  user  = await getAdminUserByUsername(username)
    console.log('this is user:', user)
    const token = jwt.sign({
      id: user.id,
      username: user.username
    }, JWT_SECRET)

    res.send({
      token,
      user: user,
      message: "you're logged in!",
    })

  } catch (error) {
    next(error);
  }
});

module.exports = apiRouter;
