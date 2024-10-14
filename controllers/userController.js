const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  try {
    console.log("New User:", req.body);
    const { username, email, password } = req.body;
    const hashPassword = await bcrypt.hash(password, 12)
    // const newUser = await User.create(req.body);
    const newUser = await User.create({ 
        username, 
        email,
        password : hashPassword
    });
    res.status(201).json({
        status: "success", 
        data: { 
            user: newUser 
        } 
    });
  } catch (error) {
    console.log("Error: ", error);
    res.status(400).json({ 
        status: "Failed to Register User"
    });
  }
};

exports.login = async (req, res) => {
  try {
    const {email, password} = req.body;
    // const hashPassword = await bcrypt.hash(password,12);
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(404).json({ 
            status: "fail", 
            message: "Invalid Email" 
        });
    }

    const isCorrrect = await bcrypt.compare(password, user.password)
    if (isMatch){
        res.status(200).json({
            status: "success", 
            data: { 
                user: user.username,
                email:  email 
            } 
        });
    } else {
        res.status(404).json({ 
            status: "fail", 
            message: "Invalid Password" 
        });
    }
    // const token = jwt.sign({ id: user._id }, "your_jwt_secret", {
    //   expiresIn: "1d",
    // });
    // res.status(200).json({ status: "success", token });
  } catch (error) {
    res.status(400).json({ 
        status: "Failed to login user"
    });
  }
};