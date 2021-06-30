const { response } = require("express");
const express = require("express");
const router = express.Router();
const Creek = require("../models/Creek");
const User = require("../models/User");

router.get("/", async (req, res, next) => {
  try {
    const allUsers = await User.find();
    return res.status(200).json(allUsers);
  } catch (error) {
    return next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    return res.status(200).json(user);
  } catch (error) {
    return next(error);
  }
});

router.put("/edit/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const { userName, password, email } = req.body;
    const user = { userName, password, email };
    const editedUser = await User.findByIdAndUpdate(id, user, { new: true });
    return res.status(201).json(editedUser);
  } catch (error) {
    console.log("error", error.message);
    return next(error);
  }
});

router.delete("/delete/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedUser = await User.findByIdAndDelete(id);
    let response = "";
    if (deletedUser) {
      response = "user deleted";
    } else {
      response = "user not found";
    }
    return res.json(response);
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
