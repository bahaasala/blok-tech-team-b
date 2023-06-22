const options={rootMargin:"0px 0px -50px 0px",threshold:0},slideInLeftElements=document.querySelectorAll(".slide-in-left"),slideInTopElements=document.querySelectorAll(".slide-in-top"),delay=500,callback=(e,o)=>{e.forEach((e,t)=>{e.isIntersecting&&(setTimeout(()=>{e.target.classList.add("in-view")},t*delay),o.unobserve(e.target))})},observer=new IntersectionObserver(callback,options),tripItems=(slideInLeftElements.forEach(e=>observer.observe(e)),slideInTopElements.forEach(e=>observer.observe(e)),document.querySelectorAll(".trip-item")),initialDelay=(gsap.set(tripItems,{opacity:0,y:200}),1200),locationElement=(setTimeout(()=>{tripItems.forEach((e,t)=>{gsap.to(e,{opacity:1,y:0,duration:.6,delay:.4*t,ease:"power1.out"})})},initialDelay),window.addEventListener("load",()=>{const e=document.querySelector(".loading"),t=document.querySelector("main");setTimeout(()=>{e.style.display="none",t.style.display="flex"},500)}),document.getElementById("currentLocation")),sections=(locationElement&&navigator.geolocation.getCurrentPosition(e=>{var t=e.coords.latitude,e=e.coords.longitude;fetch(`https://api.geoapify.com/v1/geocode/reverse?lat=${t}&lon=${e}&apiKey=15a0ff507ba54cdeaa2699add37a5999`).then(e=>e.json()).then(e=>{var e=e.features[0].properties,t=e.city||e.town||e.village||"",e=e.country||"";locationElement.textContent=`Location: ${t}, `+e}).catch(e=>{locationElement.textContent="Error retrieving location"})},e=>{console.error(e),document.getElementById("currentLocation").textContent="Error retrieving location."}),document.querySelectorAll(".trip-item"));function fadeImages(){sections.forEach(e=>{e=Array.from(e.querySelectorAll(".trip-image:not(:first-child)"));gsap.fromTo(e,{opacity:0},{opacity:1,duration:1,stagger:5,repeat:-1,repeatDelay:5,yoyo:!0})})}0!==sections.length&&fadeImages();const removeBookingButton=document.getElementById("removeBookingButton"),removeBookingScreen=document.querySelector(".removeBookingScreen"),noKeepBookingButton=document.getElementById("noKeepBookingButton");removeBookingButton?.addEventListener("click",()=>{removeBookingScreen.classList.remove("hidden")}),noKeepBookingButton?.addEventListener("click",()=>{removeBookingScreen.classList.add("hidden")});