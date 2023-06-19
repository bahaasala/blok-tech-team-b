const { db } = require("../connect")
const Trip = require("../schemas/Trip")
const User = require("../schemas/User")
const unsplash = require("../unsplash")

const startpageController = async (req, res, next) => {
  try {
    const user = await User.findOne({
      username: req.session.username
    })

    const trips = await Trip.find()

    res.render("index.ejs", {
      title: "Startpage",
      user: user,
      trips: trips
    })
  } catch (err) {
    next(err)
  }
}

module.exports = startpageController
