// const { User } = require("../models/userModels");
// const jwt = require("jsonwebtoken");

// const Authenticate = async (req, res, next) => {
//     try {
//         // Get the Authorization header
//         const authHeader = req.headers["authorization"];
//         if (!authHeader) return res.status(401).json({ message: "Login first" });

//         // Extract token after "Bearer "
//         const token = authHeader.split(" ")[1];
//         if (!token) return res.status(401).json({ message: "Login first" });

//         // Verify token
//         const decode = jwt.verify(token, process.env.JWT_SECRET); // Use your JWT secret
//         const id = decode.userId;

//         // Find user in DB
//         const user = await User.findById(id);
//         if (!user) return res.status(404).json({ message: "User does not exist" });

//         req.user = user; // Attach user to request
//         next();
//     } catch (error) {
//         res.status(401).json({ message: "Invalid token" });
//     }
// };

// module.exports = Authenticate;
// const { User } = require("../models/userModels"); const jwt = require("jsonwebtoken"); const Authenticate = async (req, res, next) => { const token = req.header("Auth"); try { if (!token) return res.status(401).json({ message: "Login first" }); const decode = jwt.verify(token, "!@#$%^&*()"); const id = decode.userId; let user = await User.findById(id); if (!user) return res.status(404).json({ message: "User does not exist" }); req.user = user; next(); } catch (error) { res.status(500).json({ message: "Invalid token" }); } }; module.exports = Authenticate;

// const { User } = require("../models/userModels");
// const jwt = require("jsonwebtoken");

// const Authenticate = async (req, res, next) => {
//   try {
//     const authHeader = req.headers["auth"];
//     if (!authHeader) return res.status(401).json({ message: "Login first" });

//     const token = authHeader.split(" ")[1];
//     if (!token) return res.status(401).json({ message: "Login first" });

//     const decode = jwt.verify(token, process.env.JWT_SECRET);
//     const user = await User.findById(decode.id);
//     if (!user) return res.status(404).json({ message: "User does not exist" });

//     req.user = user; // attach user to request
//     next();
//   } catch (error) {
//     console.error(error);
//     res.status(401).json({ message: "Invalid token" });
//   }
// };

// module.exports = Authenticate;
const User = require("../models/userModels"); // NO destructuring

const jwt = require("jsonwebtoken");

const Authenticate = async (req, res, next) => {
  try {
    // 1️⃣ Get Authorization header
    const authHeader = req.headers["authorization"];
    if (!authHeader) return res.status(401).json({ message: "Login first" });

    // 2️⃣ Extract token after "Bearer "
    const token = authHeader.split(" ")[1];
    if (!token) return res.status(401).json({ message: "Login first" });

    // 3️⃣ Verify token using same secret as login
    const decode = jwt.verify(token, process.env.JWT_SECRET);

    // 4️⃣ Find user in DB
    const user = await User.findById(decode.id);
    if (!user) return res.status(404).json({ message: "User does not exist" });

    // 5️⃣ Attach user to request and continue
    req.user = user;
    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = Authenticate;
