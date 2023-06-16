const { faker } = require("@faker-js/faker")

const generateFakeUsers = (amount) => {
  const users = []
  for (let i = 0; i < amount; i++) {
    const user = {
      first_name: faker.person.firstName(),
      last_name: faker.person.lastName(),
      username: faker.internet.userName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      image_url: faker.image.avatar()
    }
    users.push(user)
  }
  return users
}

module.exports = { generateFakeUsers }
