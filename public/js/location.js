navigator.geolocation.getCurrentPosition(
  (position) => {
    const latitude = position.coords.latitude
    const longitude = position.coords.longitude
    const locationElement = document.getElementById("currentLocation")
    locationElement.textContent = `Latitude: ${latitude}, Longitude: ${longitude}`
  },
  (error) => {
    console.error(error)
    const locationElement = document.getElementById("currentLocation")
    locationElement.textContent = "Failed to fetch current location."
  }
)
