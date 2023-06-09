const mongoose = require("mongoose")

const dotenv = require("dotenv")
dotenv.config()
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.CLUSTER_URL}.dzdhppv.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`

const connect = async () => {
  mongoose.connect(uri)
  console.log("You successfully connected to Mongoose!")
}

module.exports = connect
