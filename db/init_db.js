const { query } = require("express");
const {
  client,
  // createCustomerUser,
  // createAdminUser,
  // createInventory,
  // createCart,
  // createReviews,
} = require("./");

async function dropTables() {
  console.log("dropping tables...");
  try {
    await client.query(`
    DROP TABLE IF EXISTS laptops;
    DROP TABLE IF EXISTS phones;
    DROP TABLE IF EXISTS tvs;
    DROP TABLE IF EXISTS cart;
    DROP TABLE IF EXISTS orders;
    DROP TABLE IF EXISTS reviews;
    DROP TABLE IF EXISTS products;
    DROP TABLE IF EXISTS inventory;
    DROP TABLE IF EXISTS adminUsers;
    DROP TABLE IF EXISTS customerUsers
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
      
      CREATE TABLE inventory(
        id INTEGER PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        quantity INTEGER UNIQUE NOT NULL
      );
      CREATE TABLE products(
         id SERIAL PRIMARY KEY, 
         brand VARCHAR(255) NOT NULL,
         title VARCHAR(255) UNIQUE NOT NULL,
         description VARCHAR(255) UNIQUE NOT NULL,
         "productQuantity" INTEGER REFERENCES inventory(quantity),
         price DECIMAL(6,2) UNIQUE NOT NULL,
         category VARCHAR(255) UNIQUE NOT NULL,
         img TEXT UNIQUE NOT NULL
       );

       CREATE TABLE reviews(
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        review TEXT NOT NULL,
        "userUsername" TEXT REFERENCES customerUsers (username),
        "productId" INTEGER REFERENCES products (id)
        );
     
        CREATE TABLE orders(
          id SERIAL PRIMARY KEY,
          guestName VARCHAR(255),
          "customerUserId" INTEGER REFERENCES customerUsers (Id),
          "productTitle" TEXT REFERENCES products (title),
          quantity INTEGER NOT NULL,
          "productCategory" VARCHAR(255) REFERENCES products (category),
          "productPrice" INTEGER REFERENCES products (price),
          "productDescription" TEXT REFERENCES products (description),
          total DECIMAL (6,2) NOT NULL,
          "itemImg" TEXT REFERENCES products (img)
          );

          CREATE TABLE cart(
            id INTEGER PRIMARY KEY,
            "itemTitle" VARCHAR(255) REFERENCES products (title),
            "itemPrice" DECIMAL(6,2) REFERENCES products (price)
          );

          CREATE TABLE tvs(
            id SERIAL PRIMARY KEY,
            brand VARCHAR(255) NOT NULL,
            "tvTitle" VARCHAR(255) REFERENCES products (title),
            "tvPrice" DECIMAL (6,2) REFERENCES products (price),
            "tvDescription" VARCHAR(255) REFERENCES products (description),
            "tvInventory" INTEGER REFERENCES inventory (quantity),
            "tvImg" TEXT REFERENCES products(img)
          );

          CREATE TABLE phones(
            id SERIAL PRIMARY KEY,
            brand VARCHAR(255) NOT NULL,
            "phoneTitle" VARCHAR(255) REFERENCES products(title),
            "phonePrice" DECIMAL(6,2) REFERENCES products(price),
            "phoneDescription" VARCHAR(255) REFERENCES products(description),
            "phoneIventory" INTEGER REFERENCES inventory(quantity),
            "phoneImg"TEXT REFERENCES products(img)
          
          );

          CREATE TABLE laptops(
            id SERIAL PRIMARY KEY,
            brand VARCHAR(255) NOT NULL,
            "latopTitle" VARCHAR(255) REFERENCES products(title),
            "latopPrice" DECIMAL(6,2) REFERENCES products(price),
            "laptopDescription" VARCHAR(255) REFERENCES products(description),
            "laptopInventory" INTEGER REFERENCES inventory(quantity),
            "laptopImg" TEXT REFERENCES products(img)

              );      
          `);
  } catch (error) {
    console.log("Error creating tables", error);
    throw error;
  }
  console.log("Finished building tables");
}

async function populateInitialCustomerUsers() {
  console.log("Starting to create Users...");
  try {
    const customerUsersToCreate = [
      {
        username: "mitchel99",
        email: "mitchel99@hotmail.com",
        password: "password123",
        orderId: "0001",
      },
      {
        username: "martin10",
        email: "martin10@gmail.com",
        password: "martinpassword",
        orderId: "0002",
      },
      {
        username: "cindy20",
        email: "cindy20@myspace.com",
        password: "cindypassword",
        orderId: "0003",
      },
      {
        username: "nate90",
        email: "nate90@gmail.com",
        password: "natepassword",
        orderId: "0004",
      },
      {
        username: "krystin15",
        email: "krystin15@hotmail.com",
        password: "krystinpassword",
        orderId: "0005",
      },
    ];
    const customerUsers = await Promise.all(
      customerUsersToCreate.map(/*Need a createCustomerUser function imported */)
    );

    console.log("Customer Users created:");
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
      adminUsersToCreate.map(/*Need a createAdminUser function imported */)
    );
    console.log("Admin created");
  } catch (error) {
    console.error("Error creating admin");
    throw error;
  }
}

async function populateInitialInventory() {
  console.log("Starting to create inventory");
  try {
    const inventoryToCreate = [
      { title: "Typewriter", quantity: 10 },
      { title: "Rotary phone", quantity: 5 },
    ];
    const inventory = await Promise.all(
      inventoryToCreate.map(/*Need a createInventory function imported */)
    );
    console.log("Finished creating inventory");
  } catch (error) {
    console.error("Error creating inventory");
    throw error;
  }
}

async function populateInitialProducts() {
  console.log("Starting to create Products");
  try {
    const productToCreate = [
      {
        title: "Macbook Pro 13.3 Laptop",
        description: "Apple M2 Chip  8GB Memory - 265GB SSD - Space Gray",
        brand: "Apple",
        price: "1150.00",
        productQuantity: "100",
        category: "laptop",
        img: "https://www.zdnet.com/a/img/resize/113ebe4af17aa88bea94dc29c67d51eeb5d3a34e/2019/08/05/b2e40423-7c4c-48b5-9c7a-ea7ee92f96fe/13-inch-mbpro-header.jpg?auto=webp&fit=crop&height=675&width=1200  ",
      },

      {
        title: "Microsoft Surface Laptop 4",
        description: "Touch-Screen - Intel Core i5 - 512GB SSD - Sandstone",
        brand: "Microsoft",
        price: 800.0,
        productQuantity: "300",
        category: "laptop",
        img: "https://i5.walmartimages.com/asr/ef1be66b-33ae-42c5-87da-723c26a44d48.0238c47c6780c6af7e57ba61a7cbc070.jpeg?odnHeight=612&odnWidth=612&odnBg=FFFFFF",
      },

      {
        title: "Samsung Galaxy Book2 Pro 360 Laptop",
        description:
          "Touch-Screen - Intel 12th Gen Evo Core i7 - 1TB SSD - Silver",
        brand: "Samsung",
        price: 1100.0,
        productQuantity: 250,
        category: "laptop",
        img: "https://pisces.bbystatic.com/image2/BestBuy_US/images/products/6501/6501593_sd.jpg",
      },

      {
        title: "LG 70 Class NanoCell LED 4k TV",
        description: "Smart webOS TV",
        brand: "LG",
        price: 650,
        productQuantity: 300,
        category: "TV",
        img: "https://pisces.bbystatic.com/image2/BestBuy_US/images/products/6501/6501916_sd.jpg;maxHeight=200;maxWidth=300",
      },
    ];
    const product = await Promise.all(
      productToCreate.map(/*Need a productCart function imported */)
    );
    console.log("Finished creating product");
  } catch (error) {
    console.error("Error creating product");
  }
}

async function populateInitialCart() {
  console.log("Starting to create cart");
  try {
    const cartToCreate = [
      //Not sure how to reference. Are "" needed?
      { itemQuantity: 5, itemTitle: "random title", itemPrice: "10.99" },
      { itemQuantity: 3, itemTitle: "macbook-13 in", itemPrice: "14.30" },
      { itemQuantity: 2, itemTitle: "other random title", itemPrice: "9.20" },
    ];
    const cart = await Promise.all(
      cartToCreate.map(/*Need a createCart function imported */)
    );
    console.log("Finished creating cart");
  } catch (error) {
    console.error("Error creating cart");
    throw error;
  }
}

async function populateInitialReview() {
  console.log("Starting to create reviews");
  try {
    const reviewsToCreate = [
      //Not sure how to reference. Are "" needed?
      {
        userUsername: "mitchel99",
        productId: "1",
        title: "Review title",
        review: "bad product",
        img: "https://i.natgeofe.com/n/548467d8-c5f1-4551-9f58-6817a8d2c45e/NationalGeographic_2572187_2x1.jpg",
      },
      {
        userUsername: "cindy20",
        productId: "2",
        title: "Example title",
        review: "good product",
        img: "",
      },
      {
        userUsername: "nateId",
        productId: "3",
        title: "title 2",
        review: "okay product",
        img: "",
      },
    ];
    const reviews = await Promise.all(
      reviewsToCreate.map(/*Need a createReviews function imported */)
    );
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
    await populateInitialInventory();
    await populateInitialProducts();
    await populateInitialCart();
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
