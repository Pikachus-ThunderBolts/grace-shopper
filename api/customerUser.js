const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const { JWT_SECRET } = process.env;
const jwt = require("jsonwebtoken");

const {
  createCustomerUser,
  getCustomerUserByUsername,
  getCustomerUserById,
} = require("../db/customerUsers");
