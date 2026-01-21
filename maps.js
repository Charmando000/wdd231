// select HTML elements in the document
const myTown = document.querySelector('#town');
const myTemp = document.querySelector('#temperature');
const myGraphic = document.querySelector('#graphic');
const myDescription = document.querySelector('#description');

const myKey = '9d4340f91de93a79d6ddc37dd06d13f8';
const myLat = '49.75115293012801';
const myLon = '6.635028185864559';

// API URL and key
const url = `https://api.openweathermap.org/data/2.5/weather?lat=${myLat}&lon=${myLon}&appid=${myKey}`; // replace with actual endpoint
// function to fetch weather data
async function apiFetch() {
  try {
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      console.log(data); // testing only
      // displayResults(data); // uncomment when ready
    } else {
        throw Error(await response.text());
    }
  } catch (error) {
      console.log(error);
  }
}

// call the function to fetch weather data

function displayResults(data) {
    myTown.innerHTML = data.name;
    myDescription.innerHTML = data.weather[0].description;
    myTemp.innerHTML = `${data.main.temp} &deg;F`;
    const iconSrc = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`;
    myGraphic.setAttribute('src', iconSrc);
    myGraphic.setAttribute('alt', data.weather[0].description);
}

apiFetch();