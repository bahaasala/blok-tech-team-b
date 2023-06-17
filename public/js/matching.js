const skipBtn = document.querySelector(".trips-button-skip")
const tripsContainer = document.querySelector(".trips-group")
let tripIndex = 1

const dataset = document.getElementById("page").textContent
let pageData
try {
  pageData = JSON.parse(dataset)
} catch (error) {
  console.log(error)
}

const skipToNextApplication = () => {
  const translateAmount = tripIndex * -26.5 + "rem"
  tripsContainer.style.transform = `translateX(${translateAmount})`
  tripIndex++
}

skipBtn.addEventListener("click", (e) => {
  e.preventDefault()
  e.stopPropagation()
  if (tripIndex > pageData.length) {
    return skipBtn.classList.add("disabled")
  } else if (tripIndex === pageData.length) {
    skipToNextApplication()
    return skipBtn.classList.add("disabled")
  }
  updateSeen(pageData, tripIndex - 1)
  skipToNextApplication()
})

const wishlistBtn = document.querySelectorAll(".trip-button-wishlist")

wishlistBtn.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.preventDefault()
    e.stopPropagation()
    const tripId = btn.getAttribute("data-id")
    btn.classList.add("active")
    updateWishlist(tripId)
  })
})

const updateSeen = async (tripIds, index) => {
  const res = await axios
    .post(`/trips`, { action: "skip", sortedIds: tripIds, groupIndex: index })
    .then((response) => {
      console.log(response.data)
    })
    .catch((error) => {
      console.log(error)
    })
}

const updateWishlist = async (id) => {
  const res = await axios
    .post(`/trips`, { action: "wishlist", tripId: id })
    .then((response) => {
      console.log(response.data)
    })
    .catch((error) => {
      console.log(error)
    })
}
