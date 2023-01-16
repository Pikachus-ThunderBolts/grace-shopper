const client = require("./client");

module.exports = {
  client,
  ...require("./customerUsers"),
  ...require("./adminUsers"),
  ...require("./guestUsers"),
  // ...require("./inventory"),
  ...require("./products"),
  ...require("./reviews"),
};
