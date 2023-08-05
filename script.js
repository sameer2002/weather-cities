const apiKey="70191d67ec29af96f74fa3e6f394aec6";
const baseUrl=`https://api.openweathermap.org/data/2.5`;

const weatherForm = document.getElementById('weatherForm');
const weatherInfo = document.getElementById('weatherInfo');

const citiesAdded = [];
const weatherData = [];
weatherForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const city = document.getElementById('cityInput').value.trim();
  if(city==""){
    return;
}
if (citiesAdded.includes(city.toLowerCase())) {
  alert('This city has already been added.');
  return;
}

  getWeather(city);
  citiesAdded.push(city.toLowerCase());
  
});


async function getWeather(city){
    let url=`${baseUrl}/weather?q=${city}&appid=${apiKey}&units=metric`;
    try {
        // Fetch the data
        const response = await fetch(url);
        const result=await response.json();
    console.log(result)
    weatherData.push(result);
    //addDatatoUi(result);
    displayData();
    

        // Get the content div
        
      } catch (error) {
        console.error('Failed to fetch and render', error);
      }
    
}
const container=document.getElementById("cont");
function addDatatoUi(data){
  const card=document.createElement("div");
  card.className="card";
    const cityName = data.name;
    const country = data.sys.country;
    const temp = Math.round(data.main.temp);
    const weatherDescription = data.weather[0].description;
    const weatherIcon = data.weather[0].icon;
    const cloudiness = data.clouds.all;
    const humidity = data.main.humidity;
    const pressure = data.main.pressure;
    const windDirection = data.wind.deg;
    const windSpeed = data.wind.speed;
    const sunrise = new Date(data.sys.sunrise * 1000).toLocaleTimeString();
    const sunset = new Date(data.sys.sunset * 1000).toLocaleTimeString();
    card.innerHTML = `
    <img src="http://openweathermap.org/img/wn/${weatherIcon}@4x.png" alt="">   
            <div class="parent-div">
                <div class="card-det">
                  <h2>${temp}°</h2>
                  <p>Clouds: ${cloudiness}%</p>
                  <p>Speed: ${windSpeed} m/s , Direction: ${windDirection}°</p>
                  <p>Humidity: ${humidity}%, Pressure: ${pressure} hPa</p>
                  <p>Sunrise: ${sunrise} , Sunset: ${sunset}</p>
                  <div class="desc">
                    <p>${cityName}, ${country}</p>
                    <p>
                        ${weatherDescription}
                    </p>
                  </div>
                  
                </div>
                <svg class="flt_svg" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <filter id="flt_tag">
                            <feGaussianBlur in="SourceGraphic" stdDeviation="8" result="blur" />    
                            <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9" result="flt_tag" />
                            <feComposite in="SourceGraphic" in2="flt_tag" operator="atop"/>
                        </filter>
                    </defs>
                </svg>
            </div>
    `;
    container.appendChild(card);
   
}
function displayData() {
  // Sort the array based on temperature
  weatherData.sort((a, b) => b.main.temp - a.main.temp);

  // Clear the container
  container.innerHTML = '';

  // Add each city to the UI
  weatherData.forEach(data => {
      addDatatoUi(data);
  });
}




