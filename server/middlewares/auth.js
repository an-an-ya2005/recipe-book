const jwt = require("jsonwebtoken");
const userModel = require("../models/userModels");

module.exports = async (req, res, next) => {
  const token = req.headers["authorization"];

  try {
    if (!token) {
      return res.status(401).json({ message: "Login first", success: false });
    }

    // Verify the token
    const decoded = jwt.verify(token.split(" ")[1], process.env.JWT_SECRET);

    // Fetch the user from the database
    const user = await userModel.findById(decoded.id);
    if (!user) {
      return res.status(404).json({ message: "User not found", success: false });
    }
    console.log(user)

    // Attach the user to the request object
    req.user = user;

    next();
  } catch (error) {
    console.error("Auth Middleware Error:", error);
    res.status(401).send({
      message: "Auth Failed",
      success: false,
    });
  }
};
