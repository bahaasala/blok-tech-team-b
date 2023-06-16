const { faker } = require("@faker-js/faker")

const generateFakeTrips = (amount) => {
  const trips = []
  for (let i = 0; i < amount; i++) {
    const tripLength = faker.number.int({ min: 5, max: 30 })
    const tripName = faker.location.city()
    const fakeDate = faker.date.between({
      from: "2024-01-01T00:00:00.000Z",
      to: "2025-01-01T00:00:00.000Z"
    })

    const generateFakeAvailability = (amount) => {
      const availabilityArray = []
      for (let i = 0; i < amount; i++) {
        const availability = {
          start_date: fakeDate,
          end_date: fakeDate + tripLength
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

    const generateFakeImages = (amount) => {
      const imagesArray = []
      for (let i = 0; i < amount; i++) {
        const image = {
          url: faker.image.urlLoremFlickr({ category: "city" }),
          alt: faker.lorem.sentence(1)
        }
        imagesArray.push(image)
      }
      return imagesArray
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
      images: generateFakeImages(faker.number.int({ min: 3, max: 10 }))
    }
    trips.push(trip)
  }
  return trips
}

module.exports = { generateFakeTrips }
