
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


exports.editUserAvatar = async (req, res, next) => {
  const receiveForm = formidable.IncomingForm();
  await receiveForm.parse(req, (err, fields, files) => {
    if (err || files.avatarImageInput.type !== "image/jpeg") {
      res.status(204).send("error!");
    } else {
      accountModel
        .saveAvatar(files)
        .then(imageName => {
          let toChangeAvatarUser = {
            id: fields.IdToChangeAvatar,
            avatar_image: imageName,
          };
          return toChangeAvatarUser;
        })
        .then(toChangeAvatarUser => {
          console.log(toChangeAvatarUser.avatar_image);
          console.log(toChangeAvatarUser.id);
          accountModel
          .editAvatar(toChangeAvatarUser).then(result => {
            if (result === true) {
              res.status(202).redirect("/account");
            } else {
              res.send(204).end();
            }
          });
        });
    }
  });
};
