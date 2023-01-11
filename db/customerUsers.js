const client = require("./client");
const bcrypt = require('bcrypt')
const SALT_COUNT = 10;

async function createCustomerUser(fields) {
  if (!fields.username || !fields.password) {
    return;
  }
  const username = fields.username;
  const password = fields.password;

  //create hash password
  const hashedPassword = await bcrypt.hash(password, SALT_COUNT);
  try {
    const {
      rows: [newCustomerUser],
    } = await client.query(
      `
        INSERT INTO customerUsers (username, password)
        VALUES ($1, $2)
        RETURNING *
        ;
        `,
      [username, hashedPassword]
    );
  
    delete newCustomerUser.password;
    return newCustomerUser;
  } catch (error) {
    console.log("error creating newCustomer user, customerUser.js", error);
    throw error;
  }
}

async function getCustomerUser({ username, password }) {
  try {
    const {
      rows: [fetchCustomerUser],
    } = await client.query(
      `
        SELECT * FROM customerUsers
        WHERE username=$1
        ;
        `,
      [username]
    );

    if (!fetchCustomerUser) {
      throw new "username or password do not match"();
    } else {
      const checkPassword = await bcrypt.compare(
        password,
        fetchCustomerUser.password
      );
      if (checkPassword === true) {
        delete fetchCustomerUser.password;
        return fetchCustomerUser;
      }
    }
  } catch (error) {
    console.log("error fetching user ", error);
    throw error;
  }
}

async function getCustomerUserById(customerUserId) {
  try {
    const {
      rows: [getCustomerUserById],
    } = await client.query(
      `
        SELECT FROM customerUsers
        WHERE id=$1
        ;
        `,
      [customerUserId]
    );
    delete customerUserId.password;
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
    console.log("Error in getCustomerUserByUsername");
    throw error;
  }
}

module.exports = {
  createCustomerUser,
  getCustomerUser,
  getCustomerUserById,
  getCustomerUserByUsername,
};
