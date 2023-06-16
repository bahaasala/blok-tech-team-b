const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
  first_name: String,
  last_name: String,
  username: {
    type: String,
    required: true
  },
  email: String,
  password: {
    type: String,
    required: true,
    minlength: 8
  },
  created_at: {
    type: Date,
    immutable: true,
    default: () => Date.now()
  },
  updated_at: {
    type: Date,
    default: () => Date.now()
  },
  image_url: String,
  savedTrips: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Trip"
    }
  ],
  bookedTrips: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Booking"
    }
  ],
  seenTrips: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Trip"
    }
  ]
})

userSchema
  .post("save", function (doc, next) {
    this.updated_at = Date.now()
    console.log("A user was saved to the database.")
    next()
  })
  .post("remove", function (doc, next) {
    console.log("A user was removed from the database.")
    next()
  })

module.exports = mongoose.model("User", userSchema)
