const express = require("express");
const User = require("../models/User");

const bcrypt = require("bcrypt");
const { response } = require("express");

const router = express.Router();

//update
router.put("/:id", async (req, res) => {
  if (req.body.userId === req.params.id || req.body.isAdmin) {
    if (req.body.password) {
      try {
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt);
      } catch (error) {
        return res.status(500).json(error);
      }
    }
    try {
      const user = await User.findByIdAndUpdate(req.params.id, {
        $set: req.body,
      });
      res.status(200).json("account has been updated");
    } catch (error) {
      return res.status(500).json(error);
    }
  } else {
    return res.status(403).json("you can update your account");
  }
});
// get delete user

router.delete("/:id", async (req, res) => {
  if (req.body.userId === req.params.id || req.body.isAdmin) {
    try {
      const user = await User.findByIdAndDelete(req.params.id);
      res.status(200).json("account has been deleted");
    } catch (error) {
      return res.status(500).json(error);
    }
  } else {
    return res.status(403).json("you can delete your account");
  }
});
//get a user
router.get("/", async (req, res) => {
  const userId = req.query.userId;
  const username = req.query.username;
  try {
    const user = userId
      ? await User.findById(userId)
      : await User.findOne({ username: username });
    const { password, updatedAt, ...other } = user._doc;
    res.status(200).json(other);
  } catch (err) {
    res.status(500).json(err);
  }
});


//get a user by id
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const {password,updatedAt,...other}= user._doc
    return res.status(200).json(other)
  } catch (error) {
    return res.status(500).json(error);
  }
});

// follow a user
router.put('/:id/follow',async (req,res)=>{
 

  if(req.body.userId!== req.params.id){
    try {

      const user= await User.findById(req.params.id)
      const currentUser= await User.findById(req.body.userId)
      if(!user.followers.includes(req.body.userId)){
        await user.updateOne({$push: {followers:req.body.userId} })
        await currentUser.updateOne({$push: {followings:req.params.id} })
        res.status(200).json(" user has been followed")
      }
    } catch (error) {
      res.status(500)
      .json('you already followers this user')
    }
  }else{
    res.status("403").json( "you can't follow yourself")

  }

})

//unfollow a user

router.put('/:id/unfollow',async (req,res)=>{ 
  if(req.body.userId!== req.params.id){
    try {

      const user= await User.findById(req.params.id)
      const currentUser= await User.findById(req.body.userId)
      if(user.followers.includes(req.body.userId)){
        await user.updateOne({$pull: {followers:req.body.userId} })
        await currentUser.updateOne({$pull: {followings:req.params.id} })
        res.status(200).json(" user has been unfollowed")
      }
    } catch (error) {
      res.status(500)
      .json("you doon't unfollowers this user")
    }
  }else{
    res.status("403").json( "you can't unfollow yourself")

  }

})

module.exports = router;
