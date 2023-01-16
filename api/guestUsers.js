const apiRouter = require("express").Router();

const { getAllGuestUsers } = require("../db/guestUsers");

apiRouter.get("/", async (req, res) => {
  try {
    const guestUsers = await getAllGuestUsers();
    res.send(guestUsers);
  } catch (error) {
    next(error);
  }
});
module.exports = apiRouter;
