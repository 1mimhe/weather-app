const PORT = 3000;

const form = document.querySelector('form');
const locationInput = document.querySelector('input');
const inp = document.querySelector('#inp');
const loc = document.querySelector('#loc');
const temp = document.querySelector('#temp');
const desc = document.querySelector('#desc');
const wind = document.querySelector('#wind');
const time = document.querySelector('#time');
const mm_temp = document.querySelector('#mm-temp');
const s_rise = document.querySelector('#s-rise');
const s_set = document.querySelector('#s-set');


form.addEventListener('submit', (e) => {
    e.preventDefault();

    time.textContent = 'Loading...';
    inp.textContent = '';
    loc.textContent = '';
    temp.textContent = '';
    desc.textContent = '';
    wind.textContent = '';
    mm_temp.textContent = '';
    s_rise.textContent = '';
    s_set.textContent = '';

    const url = `http://localhost:${PORT}/weather?address=${locationInput.value}`;
    fetch(url)
        .then(response => response.json())
        .then(data => {
            console.log(data)
            if (data.error) {
                time.textContent = data.forecastData.error;
            } else {
                time.textContent = 'Data time: ' + (new Date(data.forecastData.current_weather.time)).toLocaleString();
                inp.textContent = 'Input Address: ' + data.address;
                loc.textContent = 'Location: ' + data.location;
                temp.textContent = 'Temperature: ' + data.forecastData.current_weather.temperature;
                desc.textContent = 'Weather Description: ' + weatherCodes[Number(data.forecastData.current_weather.weathercode)];
                wind.textContent = 'WindSpeed: ' + data.forecastData.current_weather.windspeed;
                mm_temp.textContent = 'Min/Max Today Temperature: ' + '[' + data.forecastData.daily.temperature_2m_min[0] + ', ' + data.forecastData.daily.temperature_2m_max[0] + ']';
                s_rise.textContent = 'Sunrise: ' + (new Date(data.forecastData.daily.sunrise[0])).toLocaleString();
                s_set.textContent = 'Sunset: ' + (new Date(data.forecastData.daily.sunset[0])).toLocaleString();
                locationInput.value = '';
            }
        });
});

const weatherCodes = {
    0: 'Clear Sky',
    1: 'Mainly Clear',
    2: 'partly Cloudy',
    3: 'Overcast',
    45: 'Fog',
    48: 'Depositing Rime Fog',
    51: 'Drizzle: Light', 53: 'Drizzle: Moderate', 55: 'Drizzle: Dense Intensity',
    56: 'Freezing Drizzle: Light', 57: 'Freezing Drizzle:  Dense Intensity',
    61: 'Rain: Slight', 63: 'Rain: Moderate', 65: 'Rain: Heavy Intensity',
    66: 'Freezing Rain: Light', 67: 'Freezing Rain: Heavy Intensity',
    71: 'Snow fall: Slight', 73: 'Snow fall: Moderate', 75: 'Snow fall: Heavy Intensity',
    77: 'Snow Grains',
    80: 'Rain showers: Slight', 81: 'Rain showers: Moderate', 82: 'Rain showers: Violent',
    85: 'Snow showers: Slight', 86: 'Snow showers: Heavy',
    95: 'Thunderstorm: Slight or Moderate',
    96: 'Thunderstorm with slight', 99: 'heavy hail'
};