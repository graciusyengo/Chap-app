const express = require("express");
const User = require("../models/User");
const bcrypt = require("bcrypt");
const router = express.Router();
const jwt= require ("jsonwebtoken")
const passport=require("passport");




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
      profilePicture:req.body.profilePicture
    });
    // save use and return response
    const user = await newUser.save();
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json(error)
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

        // res.status(200).json(user)

    const payload={
      email:user.email,
      id: user._id
     }
    
   const token= jwt.sign(payload,"random string",{expiresIn:"1d"})
    return res.status(200).send({
      success:true,
      "message":"login successfully",
      token:"Bearer " + token,
      user
    })
  
    
    
     
  } catch (error) {
    res.status(500).json(error)
  }
});

router.get("/protected",passport.authenticate("jwt",{session:false}),(req,res)=>{
  return res.status(200).send({
       success: true,
      user:{
       id :req.user._id,
       email : req.user.email
       }
      })


})

  //  return res.status(200).send({
  //   success: true,
  //   user:{
  //     id :req.user._id,
  //     email : req.user.email,
  //   }
  //  })
 

module.exports = router;
