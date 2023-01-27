const apiRouter = require("express").Router();
require(`dotenv`).config();
const jwt = require("jsonwebtoken");

const { JWT_SECRET } = process.env;

const { createGuestUsers, getGuestUserByEmail} = require("../db/guestUsers");


apiRouter.get("/", async (req, res) => {
  try {
    const guestUsers = await getAllGuestUsers();
    res.send(guestUsers);
  } catch (error) {
    next(error);
  }
});



apiRouter.post("/register", async (req, res, next) => {
  const { email } = req.body;
  try {
    const _guestUser = await getGuestUserByEmail(email);

    if (email === _guestUser.email) {
      res.status(403)
      res.send({ 
        error: "Error",
        name: "Username error",
        message: `User ${email} is already taken.`})
    }

    const newGuest = await createGuestUsers({ email });
    const token = jwt.sign(newGuest, JWT_SECRET, {expiresIn: "1h"});
    res.send({
      message: "New guestUser created successfully.",
      user: newGuest,
      token: token,
    });
  } catch (error) {
    next(error);
  }
});
module.exports = apiRouter;


    /*const _user = await getAdminUserByUsername(username);
    if (_user) {
      res.send({
        error: `user ${username} is already taken`,
        name: 'UsernameDuplicate',
        message: `User ${username} is already taken`,
      })
      return
    } else if (password.length < 6) {
      res.send({
        error: "Password Too Short!",
        name: "PasswordLengthError",
        message: "Password Too Short!",
      })
      return
    }
    */