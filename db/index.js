const client = require("./client");

module.exports = {
  client,
  ...require("./customerUsers"),
  ...require("./adminUsers"),
  ...require("./guestUser"),
  // ...require("./inventory"),
  ...require("./products"),
};
