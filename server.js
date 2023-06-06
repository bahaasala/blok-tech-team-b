const express = require("express");
const { ObjectId } = require("mongodb");
const expressLayouts = require("express-ejs-layouts");
const { db, connect } = require("./connect");
const unsplash = require("./unsplash");
const app = express();
const port = 3000;

// connect to MongoDB
const connectDB = async () => {
  try {
    await connect();
    app.listen(port, () => {
      console.log(`Explora listening on port ${port}`);
    });
  } catch (err) {
    console.error("Failed to connect to MongoDB:", err);
  }
};

// urlencoded for form data
app.use(express.urlencoded({ extended: true }));

// call the connectDB function
connectDB();

// serving static files in server
app.use(express.static("public"));

// set templating engine
app.use(expressLayouts);
app.set("layout", "./layouts/layout");
app.set("view engine", "ejs").set("views", "views");

// routes GET requests
app
  .get("/", async (req, res, next) => {
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
  .get("/trips", async (req, res) => {
    try {
      const user = await db
        .collection("users")
        .findOne({ first_name: "Bahaa" });
      const trips = await db.collection("trips").find().toArray();
      res.render("trips.ejs", {
        title: "Trips",
        user: user,
        trips: trips,
      });
    } catch (err) {
      next(err);
    }
  })
  .get("/trips/:trip", async (req, res, next) => {
    try {
      const user = await db
        .collection("users")
        .findOne({ first_name: "Bahaa" });
      const tripSlug = req.params.trip;
      const trip = await db.collection("trips").findOne({ slug: tripSlug });
      if (!trip) {
        res.status(404).render("not_found.ejs");
        return;
      }
      res.render("trip_details.ejs", {
        title: trip.destination,
        user: user,
        trip: trip,
      });
    } catch (err) {
      next(err);
    }
  })
  .get("/trips/:trip/book", async (req, res, next) => {
    try {
      const user = await db
        .collection("users")
        .findOne({ first_name: "Bahaa" });
      const tripSlug = req.params.trip;
      const trip = await db.collection("trips").findOne({ slug: tripSlug });

      // format date
      const formatDate = (dateString) => {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");

        return `${day}-${month}-${year}`;
      };
      trip.availability.forEach((available) => {
        if (available.start_date) {
          available.start_date = formatDate(available.start_date);
        }
        if (available.end_date) {
          available.end_date = formatDate(available.end_date);
        }
      });

      if (!trip) {
        res.status(404).render("not_found.ejs", { title: "404 Not found" });
        return;
      }
      res.render("book.ejs", {
        title: trip.destination + " - Book",
        user: user,
        trip: trip,
      });
    } catch (err) {
      next(err);
    }
  })
  .post("/trips/:trip/book", async (req, res, next) => {
    const user = await db.collection("users").findOne({ first_name: "Bahaa" });
    const tripSlug = req.params.trip;
    const trip = await db.collection("trips").findOne({ slug: tripSlug });
    const currentDate = new Date();
    const offsetInMilliseconds = currentDate.getTimezoneOffset() * 60 * 1000;
    const created_at = new Date(currentDate.getTime() - offsetInMilliseconds);

    const data = {
      destination: trip.destination,
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      ...req.body,
      created_at,
    };

    const booking = await db.collection("bookings").insertOne(data);
    const bookingId = booking.insertedId;
    res.redirect("/trips/" + tripSlug + "/book/confirmed/" + bookingId);
  })
  .get("/trips/:trip/book/confirmed/:bookingId", async (req, res, next) => {
    const tripSlug = req.params.trip;
    const trip = await db.collection("trips").findOne({ slug: tripSlug });
    const bookingId = req.params.bookingId;

    // Validate bookingId format
    if (!ObjectId.isValid(bookingId)) {
      return res.status(400).render("not_found.ejs", {
        title: "Invalid Booking ID",
        message: "The booking ID provided is invalid.",
      });
    }

    try {
      const booking = await db
        .collection("bookings")
        .findOne({ _id: new ObjectId(bookingId) });

      if (!booking) {
        return res.status(404).render("not_found.ejs", {
          title: "Booking Not Found",
          message: "The booking does not exist.",
        });
      }

      const user = await db.collection("users").findOne({
        first_name: booking.first_name,
        last_name: booking.last_name,
        email: booking.email,
      });

      if (!user) {
        return res.status(403).render("not_found.ejs", {
          title: "Access Denied",
          message: "You are not authorized to view this booking.",
        });
      }

      res.render("confirmed.ejs", {
        title: "Booking Confirmed",
        user: user,
        trip: trip,
        booking: booking,
      });
    } catch (err) {
      next(err);
    }
  })
  .post(
    "/trips/:trip/book/confirmed/:bookingId/delete",
    async (req, res, next) => {
      const bookingId = req.params.bookingId;

      try {
        const booking = await db
          .collection("bookings")
          .findOne({ _id: new ObjectId(bookingId) });

        if (!booking) {
          return res.status(404).render("not_found.ejs", {
            title: "Booking Not Found",
            message: "The booking does not exist.",
          });
        }

        await db
          .collection("bookings")
          .deleteOne({ _id: new ObjectId(bookingId) });

        res.redirect("/trips");
      } catch (err) {
        next(err);
      }
    }
  )
  .get("/profile/edit", async (req, res, next) => {
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

  // 404 page
  .use((req, res) => {
    res.status(404).render("not_found.ejs", { title: "404 Not found" });
  });
