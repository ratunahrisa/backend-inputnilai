const {body} = require('express-validator');
const {validate} = require('../utilities/validator');

exports.createUser = validate([
    body("name")
        .notEmpty().withMessage("Nama tidak boleh kosong"),
    body("email")
        .notEmpty().withMessage("Email tidak boleh kosong")
        .isEmail().withMessage("Email tidak valid"),
    body("password")
        .notEmpty().withMessage("Password tidak boleh kosong")

]);

