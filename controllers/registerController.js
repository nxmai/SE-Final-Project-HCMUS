const accountModel = require("../models/accountModel");
const accountServices = require("../services/accountServices");

exports.renderRegisterPage = (req, res, next) => {
  let userToShow=null;
  if(req.user)
  {
    const id=req.user._id;
    const userToShow=accountModel.getUserById(id);
  }
  res.render("./login-register/register", {userToShow:userToShow});
};

exports.registerNewUser = async (req, res, next) => {
  await accountServices.registerNewuser(req.body.username, req.body.password, req.body.email);
  res.redirect("/login");
};

