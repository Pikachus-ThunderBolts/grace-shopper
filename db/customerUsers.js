const client = require("./client");
const bcrypt = require("bcrypt");
const SALT_COUNT = 10;

async function createCustomerUser(fields) {
  if (!fields.username || !fields.password) {
    return;
  }
  const username = fields.username;
  const password = fields.password;
  const email = fields.email;

  //create hash password
  const hashedPassword = await bcrypt.hash(password, SALT_COUNT);
  try {
    const {
      rows: [newCustomerUser],
    } = await client.query(
      `
        INSERT INTO customerUsers (username, email, password)
        VALUES ($1, $2, $3)
        RETURNING *
        ;
        `,
      [username, email, hashedPassword]
    );

    delete newCustomerUser.password;
    return newCustomerUser;
  } catch (error) {
    console.log("error creating newCustomer user, customerUser.js", error);
    throw error;
  }
}

async function getAllCustomerUsers() {
  try {
    const { rows } = await client.query(`
    SELECT *
    FROM customerUsers
    `);
    return rows;
  } catch (error) {
    console.error("There was an error gettin all customer users", error);
    throw error;
  }
}

async function getCustomerUserById(customerUserId) {
  try {
    const {
      rows: [getCustomerUserById],
    } = await client.query(
      `
        SELECT * FROM customerUsers
        WHERE id=$1
        ;
        `,
      [customerUserId]
    );
    delete customerUserId.password;
    return getCustomerUserById;
  } catch (error) {
    console.log("Error getCustomerUserById", error);
    throw error;
  }
}

async function getCustomerUserByUsername(username) {
  try {
    const {
      rows: [fetchCustomerUserByUsername],
    } = await client.query(
      `
        SELECT * FROM customerUsers
        WHERE username =$1
        `,
      [username]
    );
    return fetchCustomerUserByUsername;
  } catch (error) {
    console.log("Error in getCustomerUserByUsername", error);
    throw error;
  }
}

module.exports = {
  createCustomerUser,
  getAllCustomerUsers,
  getCustomerUserById,
  getCustomerUserByUsername,
};
