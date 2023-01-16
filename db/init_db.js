const { query } = require("express");
const {
  client,
  createCustomerUser,
  createAdminUser,
  createNewProduct,
  createGuestUsers,
  // createInventory,
  // createCart,
  createNewReview,
  getProductsByBrand,
} = require("./");

async function dropTables() {
  console.log("dropping tables...");
  try {
    await client.query(`
    DROP TABLE IF EXISTS laptops CASCADE;
    DROP TABLE IF EXISTS phones CASCADE;
    DROP TABLE IF EXISTS tvs CASCADE;
    DROP TABLE IF EXISTS cart CASCADE;
    DROP TABLE IF EXISTS orders CASCADE;
    DROP TABLE IF EXISTS reviews CASCADE;
    DROP TABLE IF EXISTS products CASCADE;
    DROP TABLE IF EXISTS guestUsers CASCADE;
    DROP TABLE IF EXISTS adminUsers CASCADE;
    DROP TABLE IF EXISTS customerUsers CASCADE
    `);
  } catch (error) {
    console.log("error dropping tables", error);
    throw error;
  }
}

async function buildTables() {
  try {
    console.log("starting to build tables");
    await client.query(`
    CREATE TABLE customerUsers(
      id SERIAL PRIMARY KEY,
      username VARCHAR(255) UNIQUE,
      email VARCHAR(255) UNIQUE NOT NULL,
      password VARCHAR(255) NOT NULL    
      );
    CREATE TABLE adminUsers(
        id SERIAL PRIMARY KEY,
        username VARCHAR(255),
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL
        );

      CREATE TABLE guestUsers(
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL
      );
      
        CREATE TABLE products(
          id SERIAL PRIMARY KEY, 
          brand VARCHAR(255) NOT NULL,
          title VARCHAR(255) UNIQUE NOT NULL,
          description VARCHAR(255) UNIQUE NOT NULL,
          price DECIMAL(6,2) UNIQUE NOT NULL,
          quantity INTEGER NOT NULL,
          category VARCHAR(255) NOT NULL,
          img TEXT UNIQUE NOT NULL
       );
        
       CREATE TABLE reviews(
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        review TEXT NOT NULL,
        "customerUserId" INTEGER REFERENCES customerUsers (id),
        "productId" INTEGER REFERENCES products (id),
        "guestId" INTEGER REFERENCES guestUsers(id),
        UNIQUE ("customerUserId", "productId","guestId")
        );
     
        CREATE TABLE orders(
          id SERIAL PRIMARY KEY,
          guestName VARCHAR(255),
          "customerUserId" INTEGER REFERENCES customerUsers (id),
          "productId" INTEGER REFERENCES products (id),
          "guestId" INTEGER REFERENCES guestUsers (id),
          quantity INTEGER NOT NULL,
          total DECIMAL (6,2) NOT NULL,
          UNIQUE ("customerUserId", "productId", "guestId")
          );

          CREATE TABLE cart(
            id SERIAL PRIMARY KEY,
            "itemId" INTEGER REFERENCES products (id)
          );    
          `);
  } catch (error) {
    console.log("Error creating tables", error);
    throw error;
  }
  console.log("Finished building tables");
}

/* UNUSED TABLES
  CREATE TABLE tvs(
            id SERIAL PRIMARY KEY,
            "tvId" INTEGER REFERENCES products (id)
          );

          CREATE TABLE phones(
            id SERIAL PRIMARY KEY,
            "phoneId" INTEGER REFERENCES products(id)
          );

          CREATE TABLE laptops(
            id SERIAL PRIMARY KEY,
            "laptopId" INTEGER REFERENCES products(id)
              );  
              */

// "productCategory" VARCHAR(255) REFERENCES products (category),

async function populateInitialCustomerUsers() {
  console.log("Starting to create Users...");
  try {
    const customerUsersToCreate = [
      {
        username: "mitchel99",
        email: "mitchel99@hotmail.com",
        password: "password123",
        // orderId: "0001",
      },
      {
        username: "martin10",
        email: "martin10@gmail.com",
        password: "martinpassword",
        // orderId: "0002",
      },
      {
        username: "cindy20",
        email: "cindy20@myspace.com",
        password: "cindypassword",
        // orderId: "0003",
      },
      {
        username: "nate90",
        email: "nate90@gmail.com",
        password: "natepassword",
        // orderId: "0004",
      },
      {
        username: "krystin15",
        email: "krystin15@hotmail.com",
        password: "krystinpassword",
        // orderId: "0005",
      },
    ];
    const customerUsers = await Promise.all(
      customerUsersToCreate.map(createCustomerUser)
    );
    console.log(customerUsers);
    console.log("Finished creating customer users!");
  } catch (error) {
    console.log("Error creating customer users");
    throw error;
  }
}

async function populateInitialAdminUsers() {
  console.log("Starting to create Admin Users");
  try {
    const adminUsersToCreate = [
      {
        username: "admin99",
        email: "admin99@gmail.com",
        password: "admin99password",
      },
      {
        username: "admin007",
        email: "admin007@gmail.com",
        password: "admin007password",
      },
    ];
    const adminUsers = await Promise.all(
      adminUsersToCreate.map(createAdminUser)
    );
    console.log(adminUsers);
    console.log("Admin created");
  } catch (error) {
    console.error("Error creating admin");
    throw error;
  }
}

async function populateInitialGuestUsers() {
  console.log("Starting to create guest Users");
  try {
    const guestUsersToCreate = [
      { email: "guestemail@hotmail.com" },
      { email: "guestemail2@hotmail.com" },
      { email: "guestemail3@hotmail.com" },
    ];
    const guestUsers = await Promise.all(
      guestUsersToCreate.map(createGuestUsers)
    );
    console.log(guestUsers);
    console.log("Finished creating guest Users");
  } catch (error) {
    console.log("Error creating guest", error);
    throw error;
  }
}

// async function populateInitialInventory() {
//   console.log("Starting to create inventory");
//   try {
//     const inventoryToCreate = [
//       { title: "Typewriter", quantity: 10 },
//       { title: "Rotary phone", quantity: 5 },
//     ];
//     const inventory = await Promise.all(inventoryToCreate.map(createInventory));
//     console.log("Finished creating inventory");
//   } catch (error) {
//     console.error("Error creating inventory");
//     throw error;
//   }
// }

async function populateInitialProducts() {
  console.log("Starting to create Products");
  try {
    const productToCreate = [
      {
        brand: "Apple",
        title: "Macbook Pro 13.3 Laptop",
        description: "Apple M2 Chip  8GB Memory - 265GB SSD - Space Gray",
        price: "1150.00",
        quantity: "100",
        category: "laptop",
        img: "https://www.zdnet.com/a/img/resize/113ebe4af17aa88bea94dc29c67d51eeb5d3a34e/2019/08/05/b2e40423-7c4c-48b5-9c7a-ea7ee92f96fe/13-inch-mbpro-header.jpg?auto=webp&fit=crop&height=675&width=1200  ",
      },

      {
        brand: "Microsoft",
        title: "Microsoft Surface Laptop 4",
        description: "Touch-Screen - Intel Core i5 - 512GB SSD - Sandstone",
        price: 800.0,
        quantity: 300,
        category: "laptop",
        img: "https://i5.walmartimages.com/asr/ef1be66b-33ae-42c5-87da-723c26a44d48.0238c47c6780c6af7e57ba61a7cbc070.jpeg?odnHeight=612&odnWidth=612&odnBg=FFFFFF",
      },

      {
        brand: "Samsung",
        title: "Samsung Galaxy Book2 Pro 360 Laptop",
        description:
          "Touch-Screen - Intel 12th Gen Evo Core i7 - 1TB SSD - Silver",
        price: 1100.0,
        quantity: 250,
        category: "laptop",
        img: "https://pisces.bbystatic.com/image2/BestBuy_US/images/products/6501/6501593_sd.jpg",
      },

      {
        brand: "LG",
        title: "LG 70 Class NanoCell LED 4k TV",
        description: "Smart webOS TV",
        price: 650,
        quantity: 300,
        category: "TV",
        img: "https://pisces.bbystatic.com/image2/BestBuy_US/images/products/6501/6501916_sd.jpg;maxHeight=200;maxWidth=300",
      },
    ];
    const product = await Promise.all(productToCreate.map(createNewProduct));
    console.log(product);
    console.log("Finished creating product");
  } catch (error) {
    console.error("Error creating product");
  }
}

// async function populateInitialCart() {
//   console.log("Starting to create cart");
//   try {
//     const cartToCreate = [
//       { itemQuantity: 5, itemTitle: "random title", itemPrice: "10.99" },
//       { itemQuantity: 3, itemTitle: "macbook-13 in", itemPrice: "14.30" },
//       { itemQuantity: 2, itemTitle: "other random title", itemPrice: "9.20" },
//     ];
//     const cart = await Promise.all(
//       cartToCreate.map(/*Need a createCart function imported */)
//     );
//     console.log("Finished creating cart");
//   } catch (error) {
//     console.error("Error creating cart");
//     throw error;
//   }
// }

async function populateInitialReview() {
  console.log("Starting to create reviews");
  try {
    const reviewsToCreate = [
      {
        customerUserId: "1",
        productId: "1",
        title: "Review title",
        review: "bad product",
        img: "https://i.natgeofe.com/n/548467d8-c5f1-4551-9f58-6817a8d2c45e/NationalGeographic_2572187_2x1.jpg",
      },
      {
        customerUserId: "2",
        productId: "2",
        title: "Example title",
        review: "good product",
        img: "",
      },
      {
        customerUserId: "4",
        productId: "3",
        title: "title 2",
        review: "okay product",
        img: "",
      },
    ];
    const reviews = await Promise.all(reviewsToCreate.map(createNewReview));
    console.log(reviews);
    console.log("Finished creating reviews");
  } catch (error) {
    console.error("Error creating review");
    throw error;
  }
}

async function rebuildDB() {
  try {
    await dropTables();
    await buildTables();
    await populateInitialCustomerUsers();
    await populateInitialAdminUsers();
    await populateInitialGuestUsers();
    // await populateInitialInventory();
    await populateInitialProducts();
    // await populateInitialCart();
    await populateInitialReview();
  } catch (error) {
    console.log("Error rebuilding DB");
    throw error;
  }
}
client.connect();
rebuildDB();

module.exports = {
  rebuildDB,
  buildTables,
  dropTables,
};
