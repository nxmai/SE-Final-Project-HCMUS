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

// try add new user
exports.addNewUser = async function (newUsername, plainNewPassword, newEmail) {
  const adminAccountCollection = await db().collection("adminAccount");
  const userpasswordCollecton = await db().collection("User-hashPassword");
  const newInserted = await adminAccountCollection.insertOne({
    name: newUsername,
    age: 10,
    email: newEmail,
    role:"admin",
    avatar_image: "https://res.cloudinary.com/hoavo1620/image/upload/v1610693807/q7lb7izyxsopfztremhg.jpg",
    isVerified: false,
    isLocked:false,
    super_admin:false,
  });
  console.log("New inserted user object");

  await bcrypt.hash(plainNewPassword, 3, (err, hashResult) => {
    if (err) {
      console.log(`Hash error: ${err}}`);
    }
    userpasswordCollecton.insertOne({ _id: newInserted.insertedId, password: hashResult });
  });
  return newInserted.insertedId;
};