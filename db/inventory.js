const client = require("./client");

async function createInventory({ inventoryTitle, inventoryQuantity }) {
  try {
    const {
      rows: [inventory],
    } = await client.query(
      `
          INSERT INTO inventory ("inventoryTitle", "inventoryQuantity")
          VALUES ($1, $2)
          RETURNING *;
        `,
      [inventoryTitle, inventoryQuantity]
    );
    return inventory;
  } catch (error) {
    console.log("There was an error creating an inventory item", error);
    throw error;
  }
}
module.exports = {
  createInventory,
};
