const { where } = require('sequelize');
const db = require('../../db/models/index');
const users = db.users; //Model User
const bcrypt = require('bcryptjs');

exports.getUsers = async () => {
    try {
        const data = await users.findAll();
        return {
            status: 200,
            data,
        }
    } catch (error) {   
        return {
            status: 500,
            message: 'Gagal mengambil data user',
            error: error.message
        }
    }
}

exports.getUser = async (userId) => {
    try {
        const data = await users.findOne({
            where: {
                id: userId
            }
        });
        return {
            status: 200,
            data,
        }
    } catch (error) {
        return {
            status: 500,
            message: "Gagal mengambil data user",
            error: error.message
        }
    }
}

exports.createUser = async (req) => {
    try {
        const {name, email, password, role} = req.body;

        //untuk mencegah pembuatan user dengan email yang sama
        const user = await users.findOne({ where: {email} })
        if (user) throw new Error("Email sudah digunakan")

        const hashedPassword = await bcrypt.hash(password, 10);

        users.create({
            name,
            email,
            password: hashedPassword,
            role
        });

        return {
            status: 200,
            message: "Berhasil menyimpan user"
        }

    } catch (error) {
        return {
            status: 500,
            message: 'Gagal membuat user',
            error: error.message
        }
    }
}

exports.updateUser = async (req, userId) => {
    try {

        const userIdLogin = req.user.id;

        if (userIdLogin != userId) {
            throw new Error ("Anda tidak mempunyai akses untuk mengedit user tersebut")
        }

        const {name, email, password, role} = req.body;

        //kalau ada pergantian password, di hash
        const updateData = password ? {
            name,
            email,
            password: await bcrypt.hash(password,10),
            role
        } 
        : 
        //kalau ga ada, biarin aja passwordnya kaya semula
        {
            name,
            email,
            password
        }

        users.update(updateData, {
            where: {
                id: userId
            }
        });

        return {
            status: 200,
            message: "Berhasil mengupdate user"
        }
    } catch (error) {
        return {
            status: 500,
            message: "Gagal mengedit user",
            error: error.message
        }
    }
}

exports.deleteUser = async (userId) => {
    try {
        users.destroy({
            where: {
                id: userId
            }
        });

        return {
            status: 200,
            message: "Berhasil menghapus user"
        }
    } catch (error) {
        return {
            status: 500,
            message: "Gagal menghapus user",
            error: error.message
        }
    }
}