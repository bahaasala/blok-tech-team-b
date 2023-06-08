const { execSync } = require("child_process")

// List of test files
const testFiles = [
  "./Booking.test.js",
  "./Trip.test.js",
  "./User.test.js"
  // Add more test files as needed
]

// Run tests for each test file
testFiles.forEach((testFile) => {
  try {
    console.log(`Running tests in ${testFile}...`)
    execSync(`jest ${testFile}`, { stdio: "inherit" })
    console.log(`Tests in ${testFile} completed successfully.`)
  } catch (error) {
    console.error(`Error occurred while running tests in ${testFile}.`)
    console.error(error.message)
  }
})

console.log("All tests completed.")
