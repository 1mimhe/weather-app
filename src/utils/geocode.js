const fetch = require('node-fetch');

const geocode = function (address, callback) {
    const url = `https://geocode.maps.co/search?q=${encodeURIComponent(address)}`;

    fetch(url)
        .then(response => {
            if (!response.ok) throw Error();

            return response.json();
        })
        .then(data => {
            if (!data.length) {
                return callback('Unable to find location. Try another search.', undefined);
            }

            callback(undefined, {
                location: data[0].display_name,
                latitude: data[0].lat,
                longitude: data[0].lon
            });
        }).catch((e) => {
        callback('Unable to fetch data.', undefined);
    });
}

module.exports = geocode;