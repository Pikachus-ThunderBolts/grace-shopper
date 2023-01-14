const client = require("./client");

async function createNewLaptop(laptopId) {
  try {
    const {
      rows: [laptops],
    } = await client.query(
      `
            INSERT INTO laptops ("laptopId")
            VALUES ($1)
            RETURNING * 
            `,
      [laptopId]
    );
    console.log("create laptops", laptops);
    return laptops;
  } catch (error) {
    console.log("there was an error creating a laptop", error);
    throw error;
  }
}

async function getLaptopById(id) {
  try {
    console.log("id here?", id);
    const {
      rows: [laptop],
    } = await client.query(
      `
    SELECT * from laptops
    WHERE id=$1
    `,
      [id]
    );

    console.log("here we have laptopbyID", laptop);

    return laptop;
  } catch (error) {
    console.log("there was an error in getLaptopById", getLaptopById);
    throw error;
  }
}

async function addProductToLaptops(laptopId) {
  try {
    const {
      rows: [product],
    } = await client.query(
      `
        INSERT INTO laptops ("laptopId")
        VALUES ($1)
        RETURNING *
        `,
      [laptopId]
    );

    console.log("here we have addProductToLaptops", product);
    return product;
  } catch (error) {
    console.log("there was an error in addProductToLaptops", error);
    throw error;
  }
}

module.exports = {
  createNewLaptop,
  getLaptopById,
  addProductToLaptops,
};
