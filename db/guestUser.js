const client = require("./client");

async function createGuestUser({ email }) {
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
module.exports = {
  createGuestUser,
};
