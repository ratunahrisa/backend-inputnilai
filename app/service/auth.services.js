const {where} = require ('sequelize');
const db = require ('../../db/models/index');
const bcrypt = require('bcryptjs');
const {generateToken} = require('../utilities/auth');

const User = db.users; //Model User

exports.signin = async(req) => {
    try {
        //ambil email dan password
        const {email, password} = req.body;

        //ambil user berdasarkan email
        const user = await User.findOne({
            where: {
                email
            }
        });

        //check ke db apakah user dengan email tersebut ada
        if (!user) {
            return {
                status: 404,
                message: `Email ${email} tidak ditemukan`
            }
        }

        //kalau user ditemukan
        const isMatchingPassword = await bcrypt.compare(password, user.password);

        if (!isMatchingPassword) {
            return {
                status: 401,
                message: "Password tidak sesuai"
            }
        }

        const payload = {
            id: user.id,
            email: user.email,
            role: user.role
        }

        const token = generateToken(payload);

        return {
            status: 200,
            data: {
                token
            }
        }


    } catch (error) {
        return {
            status: 500,
            message: "Gagal login",
            error: error.message
        }
    }
}