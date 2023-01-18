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
    console.log(rows, "More rows");
    return rows;
  } catch (error) {
    console.error("Error getting all guest users ", error);
    throw error;
  }
}
module.exports = {
  createGuestUsers,
  getAllGuestUsers,
};
