const carousel = new bootstrap.Carousel("#homeCarousel", {
  interval: 5000,
  pause: false,
});

const carouselButton = document.getElementById("carouselButton");
const faIcon = document.getElementById("faButton");

carouselButton.addEventListener("click", function () {
  if (faIcon.classList.contains("fa-pause")) {
    faIcon.classList.remove("fa-pause");
    faIcon.classList.add("fa-play");
    carousel.pause();
  } else {
    faIcon.classList.remove("fa-play");
    faIcon.classList.add("fa-pause");
    carousel.cycle();
  }
})

async function fetchWeather() {
  const apiKey = process.env.OPEN_WEATHER_API_KEY;
  const url = `https://api.openweathermap.org/data/2.5/weather?q=millinocket,me,us&limit=1&appid=${apiKey}&units=imperial`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
    displayWeather(data); 
}  catch (error) {
    console.error("There was an error!", error);
  } 
}

fetchWeather();

function displayWeather(data) {
  const weatherDiv = document.querySelector("#weather");
  // icon
  const image = document.createElement("img");
  image.src = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`;
  document.querySelector("#weather-icon").appendChild(image);
  // temp
  const temp = document.createElement("p");
  temp.textContent = `${data.main.temp}°F`;
  document.querySelector("#weather-temp").appendChild(temp);
  // description
  const description = document.createElement("p");
  description.textContent = data.weather[0].description;
  document.querySelector("#weather-description").appendChild(description);
} 