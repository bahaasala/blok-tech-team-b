// Marc - Code for geolocation API and reverse geocoding from Geoapify
const apiKey = "15a0ff507ba54cdeaa2699add37a5999" // API key van Geoapify
const locationReviewElementt = document.getElementById("locationReview")
const locationReviewButton = document.getElementById("locationReviewButton")

const getLocation = () => {
  if (navigator.geolocation) {
    // Check if geolocation is available
    navigator.geolocation.getCurrentPosition(onSuccess, onError)
  } else {
    locationReviewElementt.value =
      "Geolocation is not available for your browser."
  }
}

// Marc - Reverse geocoding from Geoapify
const onSuccess = (position) => {
  const latitude = position.coords.latitude
  const longitude = position.coords.longitude
  const reverseGeocodingUrl = `https://api.geoapify.com/v1/geocode/reverse?lat=${latitude}&lon=${longitude}&type=country&format=json&apiKey=${apiKey}` // URL for reverse geocoding

  fetch(reverseGeocodingUrl) // Fetch data of reverse geocoding
    .then((response) => response.json()) // Data transfer to json
    .then((data) => {
      // Data of reverse geocoding
      const address = data.results[0].country
      locationReviewElementt.value = address
    })
    .catch((error) => {
      // Error handling for reverse geocoding
      console.log("Error getting reverse geocoding data:", error)
      locationReviewElementt.value =
        "Could not find address, an error has occurred"
    })
}

// Marc - Error handling for geolocation
const onError = (error) => {
  locationReviewElementt.value =
    "Error found while loading your location: " + error.message
}

locationReviewButton.addEventListener("click", getLocation)

// Marc - Show submit button when everything is focused once
const submitButton = document.querySelector(".review div button")
const descriptionInput = document.querySelector(
  ".review section:nth-of-type(2) textarea"
)
let descriptionOn = false
const locationInput = document.querySelector(
  ".review section:nth-of-type(3) input"
)
let locationOn = false

const checkSubmitButton = () => {
  if (descriptionOn && locationOn) {
    console.log("submit on")
    submitButton.classList.remove("hidden")
  } else {
    console.log("submit off")
    submitButton.classList.add("hidden")
  }
}

descriptionInput.addEventListener("focus", () => {
  descriptionOn = true
  descriptionInput.classList.add("clickedReview")
  checkSubmitButton()
})

locationInput.addEventListener("focus", () => {
  locationOn = true
  locationInput.classList.add("clickedReview")
  checkSubmitButton()
})

// Marc - Check the initial state of the submit button
checkSubmitButton()

// Marc - Hide current location warning message when javascript is enabled
const jsCheck = 1
const currentLocationWaringMessage = document.querySelector(
  ".review section:nth-of-type(3) p"
)

if (jsCheck == 1) {
  currentLocationWaringMessage.classList.add("hidden")
}
