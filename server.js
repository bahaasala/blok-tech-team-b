const express = require("express")
const session = require("express-session")
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

//for loggin in
app.use(
  session({
    secret: process.env.SESSION_SECRET_KEY, // Replace with your secret key
    resave: true,
    saveUninitialized: false,
    cookie: { secure: false } // Set secure to true if using HTTPS
  })
)

// Middleware to check if user is logged in
const authenticateUser = (req, res, next) => {
  console.log(req.session.isLoggedIn)
  const allowedRoutes = ["/", "/login", "/register"]
  if (allowedRoutes.includes(req.path) || req.session.isLoggedIn) {
    // User is accessing the root, login, or register page, or is logged in
    next()
  } else {
    // User is not logged in and trying to access a restricted page, redirect to login
    res.redirect("/login")
  }
}
app.use(authenticateUser)

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
