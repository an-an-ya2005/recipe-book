const userModel = require("../models/userModels");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");


// Register Controller
const registerController = async (req, res) => {
  try {
    const existingUser = await userModel.findOne({ email: req.body.email });
    if (existingUser) {
      return res.status(200).send({ message: "User Already Exists", success: false });
    }
    const password = req.body.password;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    req.body.password = hashedPassword;
    const newUser = new userModel(req.body);
    await newUser.save();
    res.status(201).send({ message: "Registered Successfully", success: true });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: `Register Controller Error: ${error.message}`,
    });
  }
};



// Login Controller
// make sure the model is imported

const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if the user exists
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    // Generate a JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    // Send success response
    res.status(200).json({
      success: true,
      message: "Login successful",
      token,
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};



// Auth Controller
const authController = async (req, res) => {
  try {
    const user = await userModel.findById(req.body.userId);
    // console.log(user)
    if (!user) {
      return res.status(200).send({ message: "User Not Found", success: false });
    }
    user.password = undefined;
    res.status(200).send({ success: true, data: user });
  } catch (error) {
    // console.log(error);
    res.status(500).send({
      message: "Authentication Error",
      success: false,
      error,
    });
  }
};



//profile
// Import the User model

// Get User Profile
const getProfilecontroller = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized", success: false });
    }
    res.status(200).json({ success: true, data: req.user });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

// // Update User Profile
// const updateProfilecontroller = async (req, res) => {
//     try {
//         const userId = req.user.id; // Assuming `req.user` is set by the authentication middleware
//         const { name, email, phone } = req.body; // Accept data to update

//         const user = await userModel.findById(userId);

//         if (!user) {
//             return res.status(404).json({
//                 success: false,
//                 message: 'User not found',
//             });
//         }

//         // Update user details
//         user.name = name || user.name;
//         user.email = email || user.email;
//         user.phone = phone || user.phone;

//         await user.save(); // Save updated user

//         res.status(200).json({
//             success: true,
//             message: 'Profile updated successfully',
//             data: user,
//         });
//     } catch (error) {
//         res.status(500).json({
//             success: false,
//             message: 'Server error',
//             error: error.message,
//         });
//     }
// };



module.exports = {
  loginController,
  registerController,
  authController,
  getProfilecontroller,
  //  updateProfilecontroller
};
