const router = require("express").Router();
const { addUser } = require("../controller/userController");

router.post("/User", addUser);

module.exports = router;
