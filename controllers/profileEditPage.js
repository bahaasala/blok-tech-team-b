const express = require("express");
const { db } = require("../connect");
const unsplash = require("../unsplash");
const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const user = await db
      .collection("users")
      .findOne({ first_name: "Bahaa" });

    const referer = req.headers.referer;

    res.render("profile.ejs", {
      title: "Edit Profile",
      user: user,
      referer: referer,
    });
  } catch (err) {
    next(err);
  }
})

module.exports = router;