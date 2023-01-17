const apiRouter = require("express").Router();

const { getAllAdminUsers, getAdminUserById } = require("../db/adminUsers");

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
