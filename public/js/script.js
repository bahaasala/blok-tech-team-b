// Intersection observer
const options = {
  rootMargin: "0px 0px -50px 0px",
  threshold: 0,
};

const slideInLeftElements = document.querySelectorAll(".slide-in-left");
const slideInTopElements = document.querySelectorAll(".slide-in-top");
const delay = 500;

const callback = (entries, observer) => {
  entries.forEach((entry, index) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add("in-view");
      }, index * delay);
      observer.unobserve(entry.target);
    }
  });
};

const observer = new IntersectionObserver(callback, options);
slideInLeftElements.forEach((element) => observer.observe(element));
slideInTopElements.forEach((element) => observer.observe(element));

// gsap animations
const tripItems = document.querySelectorAll(".trip-item");

gsap.set(tripItems, { opacity: 0, y: 200 });

const initialDelay = 1200;

setTimeout(() => {
  tripItems.forEach((item, index) => {
    gsap.to(item, {
      opacity: 1,
      y: 0,
      duration: 0.6,
      delay: index * 0.4,
      ease: "power1.out",
    });
  });
}, initialDelay);

// Loading animation - Window: load event
window.addEventListener("load", () => {
  const loadingElement = document.querySelector(".loading");
  const main = document.querySelector("main");

  setTimeout(() => {
    loadingElement.style.display = "none";
    main.style.display = "block";
  }, 500);
});















// Code for geolocation API and reverse geocoding from Geoapify
const apiKey = "15a0ff507ba54cdeaa2699add37a5999"; // API key van Geoapify
const locationReviewElementt = document.getElementById("locationReview");
const locationReviewButton = document.getElementById("locationReviewButton");

const getLocation = () => {
  if (navigator.geolocation) {
    // Check if geolocation is available
    navigator.geolocation.getCurrentPosition(onSuccess, onError);
  } else {
    locationReviewElementt.value = "Geolocation is not available for your browser.";
  }
};


// Reverse geocoding from Geoapify
const onSuccess = (position) => {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  const reverseGeocodingUrl = `https://api.geoapify.com/v1/geocode/reverse?lat=${latitude}&lon=${longitude}&apiKey=${apiKey}`; // URL for reverse geocoding

  fetch(reverseGeocodingUrl) // Fetch data of reverse geocoding
    .then((response) => response.json()) // Data transfer to json
    .then((data) => {
      // Data of reverse geocoding
      const address = data.features[0].properties.formatted;
      locationReviewElementt.value = address;
    })
    .catch((error) => {
      // Error handling for reverse geocoding
      console.log("Error getting reverse geocoding data:", error);
      locationReviewElementt.value = "Could not find address, an error has occurred";
    });
};


// Error handling for geolocation
const onError = (error) => {
  locationReviewElementt.value = "Error found while loading your location: " + error.message;
};

locationReviewButton.addEventListener("click", getLocation);


// Show submit button when everything is focused once
const submitButton = document.querySelector(".review div input");
const descriptionInput = document.querySelector(".review section:nth-of-type(2) textarea");
let descriptionOn = false;
const locationInput = document.querySelector(".review section:nth-of-type(3) input");
let locationOn = false;

const checkSubmitButton = () => {
  if (descriptionOn && locationOn) {
    console.log("submit on");
    submitButton.classList.remove("hidden");
  } else {
    console.log("submit off");
    submitButton.classList.add("hidden");
  }
};

descriptionInput.addEventListener("focus", () => {
  console.log("description clicked");
  descriptionOn = true;
  descriptionInput.classList.add("clickedReview");
  checkSubmitButton();
});

locationInput.addEventListener("focus", () => {
  console.log("location clicked");
  locationOn = true;
  locationInput.classList.add("clickedReview");
  checkSubmitButton();
});

// Check the initial state of the submit button
checkSubmitButton();


// Hide current location warning message when javascript is enabled
const jsCheck = 1;
const currentLocationWaringMessage = document.querySelector(".review section:nth-of-type(3) p");

if (jsCheck == 1) {
  currentLocationWaringMessage.classList.add("hidden");
}