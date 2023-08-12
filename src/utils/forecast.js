const fetch = require('node-fetch');

const forecast = function (latitude, longitude, callback) {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,sunrise,sunset&current_weather=true&timezone=auto&forecast_days=1`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                return callback('Unable to find location.', undefined);
            }

            return response.json();
        })
        .then(data => callback(undefined, data))
        .catch(() => {
            callback('Unable to fetch data.', undefined);
        });
}

module.exports = forecast;