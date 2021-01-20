const { db } = require("../database/db");
const { ObjectID } = require("mongodb");
const fs = require("fs");
const path = require("path");
const bcrypt = require("bcrypt");
const { constants } = require("crypto");
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage({}) });
const { v4: uuidv4 } = require("uuid");
const cloudinary = require("cloudinary").v2;



cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
require("dotenv/config");

// get user by ID
exports.getUserById = async id => {
  const adminAccountCollection = await db().collection("adminAccount");
  const user = await adminAccountCollection.findOne({ _id: ObjectID(id) });
  return user;
};

// get user by username
exports.getUserByUsername = async name => {
  const adminAccountCollection = await db().collection("adminAccount");
  const user = await adminAccountCollection.findOne({ name: name });
  return user;
};
// list all user
exports.listAll = async () => {
  const adminAccountCollection = await db().collection("adminAccount");
  const users = await adminAccountCollection.find({}).toArray();
  return users;
};