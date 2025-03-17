const { User } = require("../models/userModels");
const jwt = require("jsonwebtoken");

const Authenticate = async (req, res, next) => {
    const token = req.header("Auth");
    try {
        if (!token) return res.status(401).json({ message: "Login first" });

        const decode = jwt.verify(token, "!@#$%^&*()");
        const id = decode.userId;

        let user = await User.findById(id);

        if (!user) return res.status(404).json({ message: "User does not exist" });

        req.user = user;
        next();
    } catch (error) {
        res.status(500).json({ message: "Invalid token" });
    }
};

module.exports = Authenticate;
