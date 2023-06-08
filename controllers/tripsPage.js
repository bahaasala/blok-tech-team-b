const express = require("express");
const { db } = require("../connect");
const unsplash = require("../unsplash");
const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const user = await db.collection("users").findOne({ first_name: "Bahaa" });
    const trips = await db.collection("trips").find().toArray();
    res.render("trips.ejs", {
      title: "Trips",
      user: user,
      trips: trips,
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
