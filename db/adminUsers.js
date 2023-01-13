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

module.exports = {
  createAdminUser,
};
