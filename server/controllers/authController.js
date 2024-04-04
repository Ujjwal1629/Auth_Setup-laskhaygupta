const User = require("../models/user");
const { hashPassword, comparePassword } = require("../helpers/auth");
const jwt = require("jsonwebtoken");

const test = (req, res) => {
  res.json("test is working");
};

//Register function endpoint
const registerUser = async (req, res) => {
  try {
    const { name, dob, email, password } = req.body;
    //conditional statements to check if all the information entered is correct
    if (!name) {
      return res.json({
        error: "please enter your name",
      });
    }
    if (!dob) {
      return res.json({
        error: "please enter your dob",
      });
    }
    if (!password || password.length > 6) {
      return res.json({
        error:
          "please enter your password and password must be at least 6 characters",
      });
    }
    const exist = await User.findOne({ email });
    if (exist) {
      return res.json({
        error: "email already registered, please login",
      });
    }
    const hashedPassword = await hashPassword(password);
    const user = await User.create({
      email,
      password: hashedPassword,
      name,
      dob,
    });

    return res.json(user);
  } catch (error) {
    console.log(error);
  }
};

//login function endpoint
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    //check for email registration
    const user = await User.findOne({ email });
    if (!user) {
      return res.json({
        error: "No user found with this email",
      });
    }
    const matches = await comparePassword(password, user.password);
    if (matches) {
      jwt.sign(
        { email: user.email, id: user._id, name: user.name },
        process.env.JWT_SECRET,
        {},
        (err, token) => {
          if (err) throw err;
          res.cookie("token", token).json(user);
        }
      );
    }
    if (!matches) {
      res.json({
        error: "password is incorrect",
      });
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  test,
  registerUser,
  loginUser,
};
