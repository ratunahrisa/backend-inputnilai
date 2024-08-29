const express = require('express');
const router = express.Router();
const userController = require('../controller/user.controller');
const UserValidation = require ('../validations/user.validation');
const {verifyToken} = require ('../utilities/auth');

router.post("/create", UserValidation.createUser, userController.createUsers);

router.get("/", verifyToken, userController.getUsers);
router.get("/:user_id", verifyToken, userController.getUser);
router.put("/:user_id", verifyToken, userController.updateUser);
router.delete("/:user_id", verifyToken, userController.deleteUser);



module.exports = router;