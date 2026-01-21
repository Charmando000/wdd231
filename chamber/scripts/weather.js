// select HTML elements in the document
const weatherContainer = document.querySelector('#weather-container');

const myKey = '9d4340f91de93a79d6ddc37dd06d13f8';
const myLat = '-46.65712904688468';
const myLon = '-122.0808573489482';

// API URLs
const currentUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${myLat}&lon=${myLon}&appid=${myKey}&units=metric`;
const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${myLat}&lon=${myLon}&appid=${myKey}&units=metric`;

// function to fetch weather data
async function apiFetch() {
  try {
    // Fetch both current weather and forecast
    const [currentResponse, forecastResponse] = await Promise.all([
      fetch(currentUrl),
      fetch(forecastUrl)
    ]);

    if (currentResponse.ok && forecastResponse.ok) {
      const currentData = await currentResponse.json();
      const forecastData = await forecastResponse.json();
      console.log('Current Weather:', currentData);
      console.log('Forecast Data:', forecastData);
      displayResults(currentData, forecastData);
    } else {
      throw Error('Failed to fetch weather data');
    }
  } catch (error) {
    console.log('Error:', error);
    weatherContainer.innerHTML = '<p>Unable to load weather data</p>';
  }
}

// Display weather results in HTML
function displayResults(currentData, forecastData) {
  // Extract current weather info
  const temp = Math.round(currentData.main.temp);
  const description = currentData.weather[0].description;
  const icon = currentData.weather[0].icon;
  const iconUrl = `https://openweathermap.org/img/w/${icon}.png`;

  // Process forecast data - get one forecast per day at noon (12:00)
  const forecastByDay = {};
  
  forecastData.list.forEach(item => {
    const date = item.dt_txt.split(' ')[0]; // Extract date (YYYY-MM-DD)
    const time = item.dt_txt.split(' ')[1]; // Extract time (HH:mm:ss)
    const hour = parseInt(time.split(':')[0]); // Get hour
    
    // Get forecast at 12:00 (noon) for each day, only first occurrence
    if (hour === 12 && !forecastByDay[date]) {
      forecastByDay[date] = {
        temp: Math.round(item.main.temp),
        description: item.weather[0].description,
        icon: item.weather[0].icon
      };
    }
  });

  // Get first 3 days of forecast
  const forecastDays = Object.entries(forecastByDay).slice(0, 3);

  // Build HTML
  let html = `
    <div class="current-weather">
      <img src="${iconUrl}" alt="${description}">
      <div class="weather-info">
        <p class="temperature">${temp}°C</p>
        <p class="description">${description}</p>
      </div>
    </div>
    <div class="forecast">
      <h3>3-Day Forecast</h3>
      <div class="forecast-cards">
  `;

  // Add forecast cards
  forecastDays.forEach(([date, data]) => {
    const forecastIcon = `https://openweathermap.org/img/w/${data.icon}.png`;
    html += `
      <div class="forecast-card">
        <p class="forecast-date">${date}</p>
        <img src="${forecastIcon}" alt="${data.description}">
        <p class="forecast-temp">${data.temp}°C</p>
      </div>
    `;
  });

  html += `
      </div>
    </div>
  `;

  // Insert HTML into container
  weatherContainer.innerHTML = html;
}

// call the function to fetch weather data
apiFetch();