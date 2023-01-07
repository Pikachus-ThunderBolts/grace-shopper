const { query } = require('express');
const {
  client,
  // declare your model imports here
  // for example, User
} = require('./');

async function dropTables(){
  console.log("dropping tables...")
  try{
    await client.query(`
    DROP TABLE IF EXISTS customerUsers;
    DROP TABLE IF EXISTS adminUsers;
    DROP TABLE IF EXISTS inventory;
    DROP TABLE IF EXISTS products;
    DROP TABLE IF EXISTS laptops;
    DROP TABLE IF EXISTS phones;
    DROP TABLE IF EXISTS tvs;
    DROP TABLE IF EXISTS cart;
    DROP TABLE IF EXISTS orders;
    DROP TABLE IF EXISTS reviews;

    `)
  }catch (error){
    console.log("error dropping tables", error);
    throw error
  }
}

async function buildTables() {
  try {
    client.query(`
    
    CREATE TABLE reviews(
      id SERIAL PRIMARY KEY,
      "userUsername" VARCHAR(255) REFERENCES users (username),
      "productId" INTEGER REFERENCES products (Id),
      title VARCHAR(255) NOT NULL,
      review TEXT NOT NULL,
      img LONGBLOB
    );
    CREATE TABLE orders(
      id SERIAL PRIMARY KEY,
      guestName VARCHAR(255),
      "userId" INTEGER REFERENCES users (Id),
      "itemTitle" TEXT REFERENCES products (title),
      quantity INT NOT NULL,
      "itemCategory" INTEGER REFERENCES products(category),
      "itemPrice" INTEGER REFERENCES products (price),
      "itemDescription" INTEGER REFERENCES products (description),
      "itemImg" LONGBLOB REFERENCES products (img),
      total DECIMAL (6,2) NOT NULL,
    );
    CREATE TABLE cart(
      id INTEGER PRIMARY KEY,
      "itemTitle" VARCHAR(255) REFERENCES products(title),
      "itemPrice" DECIMAL(6,2) REFERENCES products (price),
    )
    CREATE TABLE tvs(
      id SERIAL PRIMARY KEY,
      "tvTitle" VARCHAR(255) REFERENCES products (title),
      "tvPrice" DECIMAL (6,2) REFERENCES products (price),
      "tvDescription" VARCHAR(255) REFERENCES products (description),
      "tvInventory" INTEGER REFERENCES inventory (quantity),
      "tvImg" LONGBLOB REFERENCES products (img),
    )
    CREATE TABLE phones(
      id SERIAL PRIMARY KEY,
      "phoneTitle" VARCHAR(255) REFERENCES products(title),
      "phonePrice" DECIMAL(6,2) REFERENCES products(price),
      "phoneDescription" VARCHAR(255) REFERENCES products(description),
      "phoneIventory" INTEGER REFERENCES inventory(quantity),
      "phoneImg" LONGLOB REFERENCES products(img)
    )
    CREATE TABLE laptops(
      id SERIAL PRIMARY KEY,
      "latopTitle" VARCHAR(255) REFERENCES products(title),
      "latopPrice" DECIMAL(6,2) REFERENCES products(price),
      "laptopDescription" VARCHAR(255) REFERENCES products(description),
      "laptopInventory" INTEGER REFERENCES inventory(quantity),
      "laptopImg" LONGBLOB REFERENCES products(img)
    )
    CREATE TABLE products(
      id INTEGER PRIMARY KEY, 
      title VARCHAR(255) NOT NULL,
      description VARCHAR(255) NOT NULL,
      price DECIMAL(6,2) NOT NULL,
      "productQuantity" INTEGER REFERENCES inventory(quantity),
      category INTEGER NOT NULL,
      img LONGBLOB NOT NULL,
    )
    CREATE TABLE inventory(
      id INTEGER PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      quantity INTEGER NOT NULL,
    )
    CREATE TABLE adminUsers(
      id SERIAL PRIMARY KEY,
      username VARCHAR(255),
      email VARCHAR(255) UNIQUE NOT NULL,
      password VARCHAR(255) NOT NULL,
      "orderId" INTEGER REFERENCES orders(Id)
    )
    CREATE TABLE customerUsers(
      id SERIAL PRIMARY KEY,
      username VARCHAR(255),
      email VARCHAR(255) UNIQUE NOT NULL,
      password VARCHAR(255) NOT NULL,
      "orderId" INTEGER REFERENCES orders(id)
    );
    `
    );

    // drop tables in correct order

    // build tables in correct order
  } catch (error) {
    throw error;
  }
}

async function populateInitialData() {
  try {
    // create useful starting data by leveraging your
    // Model.method() adapters to seed your db, for example:
    // const user1 = await User.createUser({ ...user info goes here... })
  } catch (error) {
    throw error;
  }
}

buildTables()
  .then(populateInitialData)
  .catch(console.error)
  .finally(() => client.end());
