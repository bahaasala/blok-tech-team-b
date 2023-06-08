// startPage.js
const express = require("express");
const { db } = require("../connect");
const unsplash = require("../unsplash");
const router = express.Router();

router.get("/", async (req, res, next) => {
    try {
      const user = await db
        .collection("users")
        .findOne({ first_name: "Bahaa" });

      const trips = await db.collection("trips").find().toArray();

      const updatedTrips = await Promise.all(
        trips.map(async (trip) => {
          const photos = await unsplash.searchPhotos(trip.destination);
          trip.images = photos.map((photo) => {
            return {
              url: photo.url,
              alt: photo.alt,
            };
          });
          await db
            .collection("trips")
            .updateOne({ _id: trip._id }, { $set: trip });
          return trip;
        })
      );

      res.render("index.ejs", {
        title: "Home",
        user: user,
        trips: updatedTrips,
      });
    } catch (err) {
      next(err);
    }
  })

module.exports = router;