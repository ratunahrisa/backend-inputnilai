const { response } = require('express');
const UserServices = require ('../service/user.services');

exports.getUsers = async (req, res) => {
    try {
        const response = await UserServices.getUsers();
        res.status(response.status).json(response);
    } catch (error) {
        res.status(500).json({
            status: 500,
            message: 'Internal server error',
            error: error.message
        })
    }
}

exports.getUser = async (req, res) => {
    try {
        const userId = req.params.user_id;
        const response = await UserServices.getUser(userId);
        res.status(response.status).json(response);
    } catch (error) {
        return {
            status: 500,
            message: "Internal server error",
            error: error.message
        }
    }
}

exports.createUsers = async (req, res) => {
    try {
        const response = await UserServices.createUser(req);
        res.status(response.status).json(response);
    } catch (error) {
        res.status(500).json({
            status: 500,
            message: 'Internal server error',
            error: error.message
        })
    }
}

exports.updateUser = async (req, res) => {
    try {
        const userId = req.params.user_id;
        const response = await UserServices.updateUser(req, userId);
        res.status(response.status).json(response);
    } catch (error) {
        return {
            status: 500,
            message: "Internal server error",
            error: error.message
        }
    }
}

exports.deleteUser = async (req, res) => {
    try {
        const userId = req.params.user_id;
        const response = await UserServices.deleteUser(userId);
        res.status(response.status).json(response);
    } catch (error) {
        return {
            status: 500,
            message: "Internal server error",
            error: error.message
        }
    }
}