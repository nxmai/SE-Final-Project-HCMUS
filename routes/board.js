const router = require(".");

const express=require("express");
const Router=express.Router();
const boardController=require("../controllers/boardController");
Router.get("/",boardController.get );

module.exports=Router;