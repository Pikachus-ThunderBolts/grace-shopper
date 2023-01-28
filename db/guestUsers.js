const client = require("./client");

async function createGuestUsers({ email }) {
  try {
    const {
      rows: [newGuestUser],
    } = await client.query(
      `
        INSERT INTO guestUsers (email)
        VALUES ($1)
        RETURNING *
        ;
        `,
      [email]
    );
    return newGuestUser;
  } catch (error) {
    console.log("Error creating new guest user", error);
    throw error;
  }
}

async function getAllGuestUsers() {
  try {
    const { rows } = await client.query(`
    SELECT *
    FROM guestUsers
    `);
    return rows;
  } catch (error) {
    console.error("Error getting all guest users ", error);
    throw error;
  }
}

async function getGuestUserByEmail(email) {
  try {
    const {
      rows: [fetchGuestUserByEmail],
    } = await client.query(
      `
      SELECT * FROM guestUsers
      WHERE email =$1
      ;
      `, [email]
    );
    return fetchGuestUserByEmail;
  } catch (error) {
    console.error("Error getting guest by email", error);
    throw error;
  }
};

module.exports = {
  createGuestUsers,
  getAllGuestUsers,
  getGuestUserByEmail,
};
