const options = { rootMargin: "0px 0px -50px 0px", threshold: 0 },
  slideInLeftElements = document.querySelectorAll(".slide-in-left"),
  slideInTopElements = document.querySelectorAll(".slide-in-top"),
  delay = 500,
  callback = (e, t) => {
    e.forEach((e, o) => {
      e.isIntersecting &&
        (setTimeout(() => {
          e.target.classList.add("in-view")
        }, 500 * o),
        t.unobserve(e.target))
    })
  },
  observer = new IntersectionObserver(callback, options)
slideInLeftElements.forEach((e) => observer.observe(e)),
  slideInTopElements.forEach((e) => observer.observe(e))
const tripItems = document.querySelectorAll(".trip-item")
gsap.set(tripItems, { opacity: 0, y: 200 })
const initialDelay = 1200
setTimeout(() => {
  tripItems.forEach((e, t) => {
    gsap.to(e, {
      opacity: 1,
      y: 0,
      duration: 0.6,
      delay: 0.4 * t,
      ease: "power1.out"
    })
  })
}, 1200),
  window.addEventListener("load", () => {
    let e = document.querySelector(".loading"),
      t = document.querySelector("main")
    setTimeout(() => {
      ;(e.style.display = "none"), (t.style.display = "flex")
    }, 500)
  })
const locationElement = document.getElementById("currentLocation")
locationElement &&
  navigator.geolocation.getCurrentPosition(
    (e) => {
      let t = e.coords.latitude,
        o = e.coords.longitude,
        n = `https://api.geoapify.com/v1/geocode/reverse?lat=${t}&lon=${o}&apiKey=15a0ff507ba54cdeaa2699add37a5999`
      fetch(n)
        .then((e) => e.json())
        .then((e) => {
          let t = e.features[0].properties,
            o = t.city || t.town || t.village || "",
            n = t.country || ""
          locationElement.textContent = `Location: ${o}, ${n}`
        })
        .catch((e) => {
          locationElement.textContent = "Error retrieving location"
        })
    },
    (e) => {
      console.error(e)
      let t = document.getElementById("currentLocation")
      t.textContent = "Error retrieving location."
    }
  )
const sections = document.querySelectorAll(".trip-item")
function fadeImages() {
  sections.forEach((e) => {
    let t = Array.from(e.querySelectorAll(".trip-image:not(:first-child)"))
    gsap.fromTo(
      t,
      { opacity: 0 },
      {
        opacity: 1,
        duration: 1,
        stagger: 5,
        repeat: -1,
        repeatDelay: 5,
        yoyo: !0
      }
    )
  })
}
0 !== sections.length && fadeImages()
const removeBookingButton = document.getElementById("removeBookingButton"),
  removeBookingScreen = document.querySelector(".removeBookingScreen"),
  noKeepBookingButton = document.getElementById("noKeepBookingButton")
removeBookingButton?.addEventListener("click", () => {
  removeBookingScreen.classList.remove("hidden")
}),
  noKeepBookingButton?.addEventListener("click", () => {
    removeBookingScreen.classList.add("hidden")
  })
