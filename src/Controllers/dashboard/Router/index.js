const express = require("express");
const User = require("../modal/user");
const Facility = require("../modal/facility");
const router = new express.Router();
// const auth = require("../../../Middleware/auth");
router.post("/users/register", async (req, res) => {
  const user = new User(req.body);
  try {
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

router.post("/api/facility", async (req, res) => {
  try {
    const facility = new Facility(req.body);
    facility.save();
    res.status(201).send(facility);
  } catch (e) {
    console.log(e);
  }
});

router.post("/api/book",  async (req, res) => {
  try {
    // console.log(req.body);
    const { email, slot, facId } = req.body;
    if (!(await User.findOne({ email }))) {
      return res.send({
        success: false,
        msg: "User With this email doesnt exist"
      });
    }
    const { booking } = await Facility.findOne({ _id: facId }).lean();
    // console.log(booking);
    if (!booking) {
      await Facility.updateOne(
        { _id: facId },
        {
          $set: {
            booking: [{
              email,
              slot
            }]
          }
        }
      );
      return res
        .status(200)
        .send({ success: true, msg: "Successfully registered for the slot!" });
    }
    for (let i = 0; i < booking.length; i++) {
      if (booking[i].slot === slot)
        return res.send({ success: false, msg: "slot already booked! Please choose other slot." });
    }
    await Facility.updateOne(
      { _id: facId },
      {
        $push: {
          booking: {
            email,
            slot
          }
        }
      }
    );
    res
      .status(200)
      .send({ success: true, msg: "Successfully registered for the slot!" });
  } catch (e) {
    console.log(e);
  }
});

router.get("/api/fac", async (req, res) => {
  try {
    const result = await Facility.find({});
    res.json(result);
  } catch (e) {
    console.log(e);
  }
});

module.exports = router;
