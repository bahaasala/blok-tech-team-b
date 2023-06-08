const mongoose = require("mongoose")

const Trip = require("./Trip")
const User = require("./User")

const dotenv = require("dotenv")
dotenv.config()

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.CLUSTER_URL}.dzdhppv.mongodb.net/?retryWrites=true&w=majority`

describe("Trip Model", () => {
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
    await Trip.deleteMany({})
  })

  it("should create and save a new Trip", async () => {
    const mockUser = new User({
      username: "user-name",
      password: "user-password"
    })

    const savedUser = await mockUser.save()

    // Create a new Trip
    const newTrip = new Trip({
      slug: "trip-slug",
      description: "Trip description",
      image_url: "https://example.com/image.jpg",
      duration: 7,
      availability: [
        {
          start_date: new Date("2023-06-08"),
          end_date: new Date("2023-06-15")
        },
        {
          start_date: new Date("2023-07-01"),
          end_date: new Date("2023-07-08")
        }
      ],
      rooms: [
        {
          type: "room-type-1",
          gender: "female",
          price: 100
        },
        {
          type: "room-type-2",
          gender: "male",
          price: 120
        }
      ],
      price: 500,
      destination: "Trip destination",
      images: [
        {
          url: "https://example.com/image1.jpg",
          alt: "Image 1"
        },
        {
          url: "https://example.com/image2.jpg",
          alt: "Image 2"
        }
      ],
      booked_by: savedUser._id
    })

    // Save the Trip to the test database
    const savedTrip = await newTrip.save()

    // Fetch the saved Trip from the database
    const foundTrip = await Trip.findById(savedTrip._id)

    // Expectations for the newTrip object
    expect(foundTrip.slug).toBe("trip-slug")
    expect(foundTrip.description).toBe("Trip description")
    expect(foundTrip.image_url).toBe("https://example.com/image.jpg")
    expect(foundTrip.duration).toBe(7)

    expect(foundTrip.availability[0].start_date).toStrictEqual(
      new Date("2023-06-08")
    )
    expect(foundTrip.availability[0].end_date).toStrictEqual(
      new Date("2023-06-15")
    )
    expect(foundTrip.availability[1].start_date).toStrictEqual(
      new Date("2023-07-01")
    )
    expect(foundTrip.availability[1].end_date).toStrictEqual(
      new Date("2023-07-08")
    )

    expect(foundTrip.rooms[0].type).toBe("room-type-1")
    expect(foundTrip.rooms[0].gender).toBe("female")
    expect(foundTrip.rooms[0].price).toBe(100)
    expect(foundTrip.rooms[1].type).toBe("room-type-2")
    expect(foundTrip.rooms[1].gender).toBe("male")
    expect(foundTrip.rooms[1].price).toBe(120)

    expect(foundTrip.price).toBe(500)
    expect(foundTrip.destination).toBe("Trip destination")

    expect(foundTrip.images[0].url).toBe("https://example.com/image1.jpg")
    expect(foundTrip.images[0].alt).toBe("Image 1")
    expect(foundTrip.images[1].url).toBe("https://example.com/image2.jpg")
    expect(foundTrip.images[1].alt).toBe("Image 2")

    expect(foundTrip.booked_by).toStrictEqual(savedUser._id)

    // Add more expectations as needed
  })
})
