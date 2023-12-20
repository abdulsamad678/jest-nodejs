const express = require("express");
const router = express.Router();
const User = require("../model/user");

router.get("/", async (req, res) => {
    try {
      let username = await User.find({});
      console.log('username')
      if (username.length === 0) {
        res.status(400).send({ message: "user not found" });
        return;
      } else {
        return res.send({
          data: {
            yes:true,
            success: true,
            allusers: username,
          },
        });
      }
    } catch (err) {
      res.status(500).send({ data: { success: false, message: err.message } });
    }
  });

  module.exports = router;