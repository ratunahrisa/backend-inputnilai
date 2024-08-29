const jwt = require('jsonwebtoken');

exports.generateToken = (payload) => {
    const privateKey = process.env.JWT_SECRET_KEY;
    const token = jwt.sign(payload, privateKey, {
        expiresIn: "1h"
    });
    
    return token;
}


exports.verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({message: "Bearer token not found"});
    }

    const token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.JWT_SECRET_KEY, (err,decoded) => {
        if (err) {
            return res.status(402).json({message: "Invalid token"});
        }

        req.user = decoded;
        next();
    })
}


