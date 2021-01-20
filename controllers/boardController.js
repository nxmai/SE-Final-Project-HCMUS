const accountModel = require("../models/accountModel");

exports.get = async(req, res, next) => {
    if (req.user) {
        const userToShow = await accountModel.getUserById(req.user._id);
        res.render("board", { userToShow: userToShow });
    } else {
        res.redirect("/login");
    }

}