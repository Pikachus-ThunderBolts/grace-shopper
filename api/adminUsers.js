const apiRouter = require("express").Router();
require('dotenv').config();
// gets our secret files
const { JWT_SECRET } = process.env;
console.log(process.env.JWT_SECRET, "here is secret");

// requiring for hashing and checking passwords
const bcrypt = require("bcrypt");

// required to build web tokens
const jwt = require("jsonwebtoken");




const { getAllAdminUsers, getAdminUserById, getAdminUserByUsername, createAdminUser } = require("../db/adminUsers");

//Router.get
apiRouter.get("/", async (req, res) => {
  try {
    const adminUsers = await getAllAdminUsers();
    res.send(adminUsers);
  } catch (error) {
    next(error);
  }
});

apiRouter.post("/login", async (req, res, next) => {
  const { username } = req.body;
  try {
    const  user  = await getAdminUserByUsername(username)
    const token = jwt.sign({
      id: user.id,
      username: user.username
    }, JWT_SECRET)

    res.send({
      token,
      user: user,
      message: "you're logged in!",
    })

  } catch (error) {
    next(error);
  }
});

apiRouter.post('/register', async (req, res, next) => {
  const { username, email, password } = req.body;
  try {
    const _user = await getAdminUserByUsername(username);
    if (_user) {
      res.send({
        error: `user ${username} is already taken`,
        name: 'UsernameDuplicate',
        message: `User ${username} is already taken`,
      })
      return
    } else if (password.length < 6) {
      res.send({
        error: "Password Too Short!",
        name: "PasswordLengthError",
        message: "Password Too Short!",
      })
      return
    }
    const newUser = await createAdminUser({ username, email, password });
    const token = jwt.sign(
      {
        username,
      },
      JWT_SECRET,
      { expiresIn: "1w" }
    );

    res.send({
        message: 'New user created successfully.',
        token: token,
        user: newUser
      })
    
  } catch (error) {
    next(error);
  }
});

// apiRouter.post("/register", async (req, res, next) => {
//   const { username, password } = req.body;

//   try {
//     const _user = await getAdminUserByUsername(username);
    
//     if (_user) {
//       res.send({
//         error: `User ${username} is already taken.`,
//         name: "UserDuplicated",
//         message: `User ${username} is already taken.`,
//       });
//       return
//     }

//     if (password.length < 6) {
//       res.send({
//         error: "Password Too Short!",
//         name: "PasswordLengthError",
//         message: "Password Too Short!",
//       });
//       return
//     }

//     const  id  = await createAdminUser({ username, email, password });
//     console.log('id:', id)

//     const token = jwt.sign(
//       {
//         id: id, email,
//         username, 
//       },
//       JWT_SECRET,
//       { expiresIn: "1w" }
//     );
//     console.log(token, "this is token")

//     res.send({
//       message: "success",
//       token,
//       user: { id: id, username, email },
//     });
//   } catch ({ name, message }) {
//     next({ name, message });
//   }
// });


module.exports = apiRouter;
