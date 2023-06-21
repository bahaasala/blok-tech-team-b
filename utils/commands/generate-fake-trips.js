const { faker } = require("@faker-js/faker")
const biggest_cities = require("../data/cities")
const unsplash = require("../../unsplash")

const generateFakeTrips = async (amount) => {
  const trips = []
  for (let i = 0; i < amount; i++) {
    const tripLength = faker.number.int({ min: 5, max: 30 })
    const tripName = biggest_cities[i]

    const generateFakeAvailability = (amount) => {
      const availabilityArray = []
      for (let i = 0; i < amount; i++) {
        const startDate = faker.date.between({
          from: "2024-01-01T00:00:00.000Z",
          to: "2025-01-01T00:00:00.000Z"
        })
        const endDate = new Date(
          startDate.getTime() + tripLength * 24 * 60 * 60 * 1000
        )
        const availability = {
          start_date: startDate,
          end_date: endDate
        }
        availabilityArray.push(availability)
      }
      return availabilityArray
    }

    const generateFakeRooms = (amount) => {
      const roomsArray = []
      for (let i = 0; i < amount; i++) {
        const room = {
          type: faker.lorem.word(),
          gender: faker.person.sex(),
          price: faker.number.int({ min: 70, max: 200 })
        }
        roomsArray.push(room)
      }
      return roomsArray
    }

    const generateFakeImages = async () => {
      return await unsplash.searchPhotos(tripName)
    }

    const trip = {
      slug: tripName.toLowerCase().replace(" ", "-"),
      description: faker.lorem.sentence({ min: 3, max: 5 }),
      image_url: faker.image.urlLoremFlickr({ category: "city" }),
      duration: tripLength,
      availability: generateFakeAvailability(
        faker.number.int({ min: 2, max: 5 })
      ),
      rooms: generateFakeRooms(faker.number.int({ min: 1, max: 4 })),
      price: faker.number.int({ min: 300, max: 2000 }),
      destination: tripName,
      images: await generateFakeImages()
    }
    trips.push(trip)
  }
  return trips
}

module.exports = { generateFakeTrips }
