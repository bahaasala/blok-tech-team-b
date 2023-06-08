const mongoose = require("mongoose")

const Booking = require("./Booking")
const User = require("./User")

const dotenv = require("dotenv")
dotenv.config()

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.CLUSTER_URL}.dzdhppv.mongodb.net/?retryWrites=true&w=majority`

describe("Booking Model", () => {
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
    await Booking.deleteMany({})
  })

  it("should create and save a new booking", async () => {
    const mockUser = new User({
      username: "user-name",
      password: "user-password"
    })

    const savedUser = await mockUser.save()

    // Create a new booking
    const newBooking = new Booking({
      user: savedUser._id,
      date_range: {
        start_date: new Date("2023-06-08"),
        end_date: new Date("2023-06-10")
      },
      room: {
        type: "room-type",
        gender: "both",
        price: 100
      },
      price: 100,
      destination: "Booking destination"
    })

    // Save the booking to the test database
    const savedBooking = await newBooking.save()

    // Fetch the saved booking from the database
    const foundBooking = await Booking.findById(savedBooking._id)

    // Expectations
    expect(foundBooking.destination).toBe("Booking destination")
    expect(foundBooking.user).toStrictEqual(savedUser._id)
    expect(foundBooking.room.type).toBe("room-type")
    expect(foundBooking.room.gender).toBe("both")
    expect(foundBooking.room.price).toBe(100)
    expect(foundBooking.price).toBe(100)
    expect(foundBooking.date_range.start_date).toStrictEqual(
      new Date("2023-06-08")
    )
    expect(foundBooking.date_range.end_date).toStrictEqual(
      new Date("2023-06-10")
    )
    expect(foundBooking.created_at).toBeInstanceOf(Date)
    expect(foundBooking.updated_at).toBeInstanceOf(Date)
    expect(foundBooking.created_at).toStrictEqual(foundBooking.updated_at)

    // Add more expectations as needed
  })
})
