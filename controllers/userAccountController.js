
const accountModel = require("../models/accountModel");
const formidable = require("formidable");

exports.get = async (req, res, next) => {
  let userToShow=null;
  if(req.user)
  {
    userToShow=await accountModel.getUserById(req.user._id);
    const user = await accountModel.getUserById(req.user._id);

    res.render("userAccount/account", {
      id: user._id,
      name: user.name,
      email: user.email,
      role:user.role,
      address:user.address,
      address_district:user.address_district,
      address_city:user.address_city,
      super_admin:user.super_admin,
      isVerified:user.isVerified,
      isLocked: user.isLocked,
      avatar_image: user.avatar_image,
      userToShow:userToShow,
    });
  }
  else 
    res.redirect("/login");
  
};