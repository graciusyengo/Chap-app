const express = require("express");
const User = require("../models/User");
const bcrypt = require("bcrypt");
const router = express.Router();
// register
router.post("/register", async (req, res) => {
  try {
    // generate new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    // create new user
    const newUser = new User({
      userName: req.body.userName,
      email: req.body.email,
      password: hashedPassword,
    });
    // save use and return response
    const user = await newUser.save();
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
  }
});

router.post("/login", async(req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    !user && res.status(404).json("user not found");
    
    
    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    console.log(validPassword)
    
    !validPassword && res.status(400).json("wrong password");

    res.status(200).json(user)
    
    
    // res.status(201).json(user)
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
