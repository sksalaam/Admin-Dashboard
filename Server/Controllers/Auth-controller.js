const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Admin = require("../Models/Admin");

//REGISTER
const register = async (req, res) => {
  const { userName, email, password } = req.body;

  try {
    const checkUser = await Admin.findOne({ email });
    if (checkUser) {
      return res.status(400).json({
        success: false,
        message: "Email already exists!",
      });
    }
    const hashPassword = await bcrypt.hash(password, 12);
    const newUser = new Admin({
      userName,
      email,
      password: hashPassword,
    });
    await newUser.save();
    res.json({
      success: true,
      message: "Registration Successfull!",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

//LOGIN
const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const checkUser = await Admin.findOne({ email });
    if (!checkUser)
      return res.json({
        success: false,
        message: "User not found! Please register first",
      });
    const checkPassword = await bcrypt.compare(password, checkUser.password);
    if (!checkPassword) {
      return res.json({
        success: false,
        message: "Incorrect password! Please try again",
      });
    }

    const token = jwt.sign(
      {
        id: checkUser._id,
        email: checkUser.email,
        userName: checkUser.userName,
      },
      "CLIENT_SECRET_KEY",
      { expiresIn: "90m" }
    );
    res
      .cookie("token", token, {
        httpOnly: true,
        secure: false,
        sameSite: "Strict",
      })
      .json({
        success: true,
        message: "Log in successfull!",
        user: {
          email: checkUser.email,
          id: checkUser._id,
          userName: checkUser.userName,
        },
      });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

//LOGOUT
const logout = (req, res) => {
  res.clearCookie("token").json({
    success: true,
    message: "Logged out successfully",
  })
};

//AUTH MIDDLEWARE
const authMiddleware = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token)
    return res.status(401).json({
      success: false,
      message: "Unauthorised user!",
    });

  try {
    const decoded = jwt.verify(token, "CLIENT_SECRET_KEY");
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({
      success: false,
      message: "Unauthorised user!",
    });
  }
};

module.exports = { register, login, authMiddleware, logout };
