const express = require("express");
const router = express.Router();
const checkExistUsernameController = require("../controllers/api/checkExistUsernameController");
const checkExistEmailController = require("../controllers/api/checkExistEmailController");

router.get("/checkExistedUsername", checkExistUsernameController.checkExistUsername);
router.get("/checkExistedEmail", checkExistEmailController.checkExistEmail);
module.exports = router;
