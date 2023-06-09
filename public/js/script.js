// Intersection observer
const options = {
  rootMargin: "0px 0px -50px 0px",
  threshold: 0
}

const slideInLeftElements = document.querySelectorAll(".slide-in-left")
const slideInTopElements = document.querySelectorAll(".slide-in-top")
const delay = 500

const callback = (entries, observer) => {
  entries.forEach((entry, index) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add("in-view")
      }, index * delay)
      observer.unobserve(entry.target)
    }
  })
}

const observer = new IntersectionObserver(callback, options)
slideInLeftElements.forEach((element) => observer.observe(element))
slideInTopElements.forEach((element) => observer.observe(element))

// gsap animations
const tripItems = document.querySelectorAll(".trip-item")

gsap.set(tripItems, { opacity: 0, y: 200 })

const initialDelay = 1200

setTimeout(() => {
  tripItems.forEach((item, index) => {
    gsap.to(item, {
      opacity: 1,
      y: 0,
      duration: 0.6,
      delay: index * 0.4,
      ease: "power1.out"
    })
  })
}, initialDelay)

// Loading animation - Window: load event
window.addEventListener("load", () => {
  const loadingElement = document.querySelector(".loading")
  const main = document.querySelector("main")

  setTimeout(() => {
    loadingElement.style.display = "none"
    main.style.display = "flex"
  }, 500)
})

// Location
const locationElement = document.getElementById("currentLocation")
locationElement &&
  navigator.geolocation.getCurrentPosition(
    (position) => {
      const latitude = position.coords.latitude
      const longitude = position.coords.longitude
      const apiKey = "15a0ff507ba54cdeaa2699add37a5999" // API key

      // Reverse geocoding
      const reverseGeocodingUrl = `https://api.geoapify.com/v1/geocode/reverse?lat=${latitude}&lon=${longitude}&apiKey=${apiKey}` // Vervang apiKey met je eigen API-sleutel

      fetch(reverseGeocodingUrl)
        .then((response) => response.json())
        .then((data) => {
          const address = data.features[0].properties
          const city = address.city || address.town || address.village || ""
          const country = address.country || ""
          locationElement.textContent = `Location: ${city}, ${country}` // Toon plaatsnaam en land
        })
        .catch((error) => {
          locationElement.textContent = "Error retrieving location"
        })
    },
    (error) => {
      console.error(error)
      const locationElement = document.getElementById("currentLocation")
      locationElement.textContent = "Error retrieving location."
    }
  )

// trip image fading
const sections = document.querySelectorAll(".trip-item")

function fadeImages() {
  sections.forEach((section) => {
    const images = Array.from(
      section.querySelectorAll(".trip-image:not(:first-child)")
    )
    gsap.fromTo(
      images,
      { opacity: 0 },
      {
        opacity: 1,
        duration: 1,
        stagger: 5, // Adjust the stagger value to control the delay between each section's images
        repeat: -1, // Repeat the animation indefinitely
        repeatDelay: 5, // Add a small delay between each repeat
        yoyo: true // Reverse the animation for a smooth fade-in and fade-out effect
      }
    )
  })
}

sections.length !== 0 && fadeImages()

// Marc - Hide cancel booking screen on startup
const removeBookingButton = document.getElementById("removeBookingButton")
const removeBookingScreen = document.querySelector(".removeBookingScreen")
const noKeepBookingButton = document.getElementById("noKeepBookingButton")

removeBookingButton?.addEventListener("click", () => {
  removeBookingScreen.classList.remove("hidden")
})

noKeepBookingButton?.addEventListener("click", () => {
  removeBookingScreen.classList.add("hidden")
})
