const express = require("express")
const expressLayouts = require("express-ejs-layouts")
const app = express()
const port = 3000

const userRouter = require("./routes/userRoutes")
const tripsRouter = require("./routes/tripsRoutes")
const bookingsRouter = require("./routes/bookingsRoutes")
const wishlistRouter = require("./routes/wishlistRoutes")
const connect = require("./schemas/connect")

// connect to MongoDB
const connectDB = async () => {
  try {
    await connect()
    app.listen(port, () => {
      console.log(`Explora listening on port ${port}`)
    })
  } catch (err) {
    console.error("Failed to connect to MongoDB:", err)
  }
}

// urlencoded for form data
app.use(express.urlencoded({ extended: true }))

// call the connectDB function
connectDB()

// serving static files in server
app.use(express.static("public"))

// set templating engine
app.use(expressLayouts)
app.use(express.json())

app.set("layout", "./layouts/layout")
app.set("view engine", "ejs").set("views", "views")

// routes
app
  .use("/", userRouter)
  .use("/trips", tripsRouter)
  .use("/bookings", bookingsRouter)
  .use("/wishlist", wishlistRouter)

// 404 page
app.use((req, res) => {
  res.status(404).render("not_found.ejs", { title: "404 Not found" })
})
