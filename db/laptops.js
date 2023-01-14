const client = require("./client");

async function addProductToLaptops({ brand, laptopId }) {
  try {
    const {
      rows: [product],
    } = await client.query(
      `
        INSERT INTO laptops (brand, "laptopId")
        `
    );
  } catch (error) {
    console.log("there was an error in addProductToLaptops", error);
    throw error;
  }
}
