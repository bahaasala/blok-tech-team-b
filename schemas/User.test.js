const mongoose = require("mongoose")

const User = require("./User")

const dotenv = require("dotenv")
dotenv.config()

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.CLUSTER_URL}.dzdhppv.mongodb.net/?retryWrites=true&w=majority`

describe("User Model", () => {
  beforeAll(async () => {
    // Establish a connection to the MongoDB test database
    await mongoose.connect(uri)
  })

  afterAll(async () => {
    // Disconnect from the MongoDB test database
    await mongoose.connection.close()
  })

  beforeEach(async () => {
    // Clear the test database before each test
    await User.deleteMany({})
  })

  it("should create and save a new user", async () => {
    // Create a new user
    const newUser = new User({
      first_name: "John",
      last_name: "Doe",
      username: "johndoe",
      email: "johndoe@example.com",
      password: "password123",
      image_url: "https://example.com/image.jpg"
    })

    // Save the user to the test database
    const savedUser = await newUser.save()

    // Fetch the saved user from the database
    const foundUser = await User.findById(savedUser._id)

    // Expectations
    expect(foundUser.first_name).toBe("John")
    expect(foundUser.last_name).toBe("Doe")
    expect(foundUser.username).toBe("johndoe")
    expect(foundUser.email).toBe("johndoe@example.com")
    expect(foundUser.password).toBe("password123")
    expect(foundUser.image_url).toBe("https://example.com/image.jpg")
    expect(foundUser.created_at).toBeInstanceOf(Date)
    expect(foundUser.updated_at).toBeInstanceOf(Date)
    expect(foundUser.created_at).toStrictEqual(foundUser.updated_at)

    // Add more expectations as needed
  })
})
