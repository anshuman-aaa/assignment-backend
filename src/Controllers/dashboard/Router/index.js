const express = require("express");
const User = require("../modal/user");
const Facility = require("../modal/facility");
const auth = require("../../../Middleware/auth");
const router = new express.Router();
// const auth = require("../../../Middleware/auth");
router.post("/users/register", async (req, res) => {
  const user = new User(req.body);
  try {
    console.log(req.body)
    await user.save();
    const token = await user.generateAuthToken();
    const data = {
      name: user.name,
      email: user.email,
      token
    };
    res.status(201).send({ data, msg: "successfully registered!" });
  } catch (e) {
    console.log(e);
    res.status(400).send({ msg: "User Validation Failed!" });
  }
});

router.post("/users/login", async (req, res) => {
  try {
    console.log(req.body);
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password
    );
    const token = await user.generateAuthToken();
    const data = {
      email: user.email,
      name: user.name,
      token
    };
    res.status(200).send({ data });
  } catch (e) {
    res.status(400).send({ msg: "Some error occured!" });
  }
});

router.post("/user/logout", async (req, res) => {
  try {
    
    req.body = JSON.parse(req.body)
    console.log(req.body)
    req.body.tokens = req.body.tokens.filter(token => {
      return token.token !== req.token;
    });
    await req.user.save();
    res.send();
  } catch (e) {
    res.status(500).send();
  }
});

module.exports = router;
