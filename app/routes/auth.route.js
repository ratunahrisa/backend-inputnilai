const express = require('express');
const router = express.Router();
const AuthController = require('../controller/auth.controller');

router.post("/signin", AuthController.signin);



module.exports = router;