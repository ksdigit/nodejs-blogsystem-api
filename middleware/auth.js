const jwt = require("jsonwebtoken");

function auth(req, res, next) {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decodedToken = jwt.verify(token, process.env.JWT_KEY);
        req.userData = decodedToken;
        next();
    } catch (error) {
        return res.status(401).json({
            message: "Invalid or expired token",
            error: error.message,
        });
    }
}

module.exports = {
    auth: auth,
};
