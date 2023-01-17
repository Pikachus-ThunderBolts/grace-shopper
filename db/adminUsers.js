const client = require("./client");
const bcrypt = require("bcrypt");
const SALT_COUNT = 10;

async function createAdminUser(fields) {
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
      rows: [newAdminUser],
    } = await client.query(
      `
            INSERT INTO adminUsers (username, email, password)
            VALUES ($1, $2, $3)
            RETURNING *
            ;
            `,
      [username, email, hashedPassword]
    );

    delete newAdminUser.password;
    console.log(newAdminUser);
    return newAdminUser;
  } catch (error) {
    console.log("error creating new Admin user, adminUser.js", error);
    throw error;
  }
}

async function getAllAdminUsers() {
  try {
    const { rows } = await client.query(`
    SELECT *
    FROM adminUsers
    `);
    console.log(rows, "These are rows");
    return rows;
  } catch (error) {
    console.error("Error getting admin user", error);
    throw error;
  }
}

async function getAdminUserById(adminUserId) {
  try {
    const {
      rows: [getAdminUserById],
    } = await client.query(
      `
      SELECT FROM adminUsers
      WHERE id=$1
      ;
      `,
      [adminUserId]
    );
    delete adminUserId.password;
  } catch (error) {
    console.log("Error getting admin user by id", error);
    throw error;
  }
}

async function getAdminUserByUsername(username) {
  try {
    const {
      rows: [fetchAdminUserByUsername],
    } = await client.query(
      `
      SELECT * FROM adminUsers
      WHERE username =$1
      `,
      [username]
    );
    return fetchAdminUserByUsername;
  } catch (error) {
    console.log("Error getting admin user by username", error);
    throw error;
  }
}

module.exports = {
  createAdminUser,
  getAllAdminUsers,
  getAdminUserById,
  getAdminUserByUsername,
};
