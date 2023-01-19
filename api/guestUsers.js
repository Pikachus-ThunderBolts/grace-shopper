const apiRouter = require("express").Router();
require(`dotenv`).config();

const { JWT_SECRET } = process.env;

const {
  getAllGuestUsers,
  getGuestUsersByUsername,
  createGuestUsers,
} = require("../db/guestUsers");

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
    const newGuest = await createGuestUsers({ email });
    const token = jwt.sign(
      {
        email,
      },
      JWT_SECRET,
      { expiresIn: "1w" }
    );
    res.send({
      message: "New user created successfully.",
      token: token,
      user: newGuest,
    });
  } catch (error) {
    next(error);
  }
});
module.exports = apiRouter;
