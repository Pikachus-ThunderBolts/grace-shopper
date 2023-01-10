const client = require("./client");
// const bcrypt = require('bcrypt')
const SALT_COUNT = 10;

async function createCustomerUser (fields){
    if(!fields.username || !fields.password){
        return;
    }
    const username = fields.username
    const password = fields.password

    //create hash password

    const hashedPassword = await bcrypt.hash(password, SALT_COUNT)

    try{
        const {rows: [newCustomerUser]} = await client.query(`
        INSERT INTO users (username, password)
        VALUES ($1, $2)
        RETURNING *
        ;
        `, [username,hashedPassword]);
        delete newCustomerUser.password;
        return newCustomerUser
    }catch(error){
        console.log("error creating newCustomer user, customerUser.js", error);
        throw (error)
    }

}

module.exports = {
    createCustomerUser
}