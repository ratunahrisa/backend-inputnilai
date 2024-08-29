const AuthService = require('../service/auth.services');

exports.signin = async (req, res) => {
    try {
        const response = await AuthService.signin(req)
        res.status(response.status).json(response)
    } catch (error) {
        res.status(500).json({
            status: 500,
            message: "Internal server error",
            error: error.message
        });
    }
}