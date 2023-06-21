const skipBtn = document.querySelector(".trips-button-skip")
const tripsContainer = document.querySelector(".trips-group")
let tripIndex = 1

const dataset = document.getElementById("page")?.textContent
let pageData
if (dataset) {
  try {
    pageData = JSON.parse(dataset)
  } catch (error) {
    console.log(error)
  }
}

const skipToNextApplication = () => {
  const translateAmount = tripIndex * -25 + "rem"
  tripsContainer.style.transform = `translateX(${translateAmount})`
  tripIndex++
}

skipBtn?.addEventListener("click", (e) => {
  e.preventDefault()
  e.stopPropagation()
  if (tripIndex > pageData.length) {
    return skipBtn.classList.add("disabled")
  } else if (tripIndex === pageData.length) {
    skipBtn.classList.add("disabled")
  }
  updateSeen(pageData, tripIndex - 1)
  skipToNextApplication()
})

const wishlistBtn = document.querySelectorAll(".trip-button-wishlist")

wishlistBtn?.forEach((btn) => {
  btn.addEventListener("click", async (e) => {
    e.preventDefault()
    e.stopPropagation()
    const tripId = btn.getAttribute("data-id")
    const update = await updateWishlist(tripId)
    if (!update) return
    if (update.action === "add") {
      btn.classList.add("active")
    } else if (update.action === "remove") {
      btn.classList.remove("active")
    }
  })
})

const updateSeen = async (tripIds, index) => {
  return await axios
    .post(`/trips`, { action: "skip", sortedIds: tripIds, groupIndex: index })
    .then((response) => {})
    .catch((error) => {
      console.log(error)
    })
}

const updateWishlist = async (id) => {
  try {
    const response = await axios.post(`/trips`, {
      action: "wishlist",
      tripId: id
    })
    return response.data
  } catch (error) {
    console.log(error)
  }
}
