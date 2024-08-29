const {response} = require('express');
const matkulServices = require ('../service/matkul.services');

exports.inputScore = async (req, res) => {
    try {
        const response = await matkulServices.inputScore(req);
        res.status(response.status).json(response);
    } catch (error) {
        return {
            status: 500,
            message: "Internal server error",
            error: error.message
        }
    }
}

exports.getScores = async (req, res) => {
    try {
        const response = await matkulServices.getScores(req);
        res.status(response.status).json(response);
    } catch (error) {
        return {
            status: 500,
            message: "Internal server error",
            error: error.message
        }
    }
}

exports.getScore = async (req, res) => {
    try {
        const mahasiswaId = parseInt(req.params.mahasiswa_id);
        const userIdLogin = req.user.id;

        const response = await matkulServices.getScore(mahasiswaId, userIdLogin);
        res.status(response.status).json(response);
    } catch (error) {
        return {
            status: 500,
            message: "Internal server error",
            error: error.message
        }
    }
}

exports.updateNilai = async (req,res) => {
    try {
        const matkulId = req.params.matkul_id;
        const response = await matkulServices.updateNilai(req, matkulId)
        res.status(response.status).json(response);
    } catch (error) {
        return {
            status: 500,
            message: "Internal Server Error",
            error: error.message
        }
    }
}

exports.approveNilai = async (req, res) => {
    try {
        const matkulId = req.params.matkul_id;
        const response = await matkulServices.approveNilai(req, matkulId);
        res.status(response.status).json(response);
    } catch (error) {
        return {
            status: 500,
            message: "Internal server error",
            error: error.message
        }
    }
}

exports.deleteNilai = async (req,res) => {
    try {
        const matkulId = req.params.matkul_id;
        const response = await matkulServices.deleteNilai(req, matkulId);
        res.status(response.status).json(response);
    } catch (error) {
        return {
            status: 500,
            message: "Internal server error",
            error: error.message
        }
    }
}



