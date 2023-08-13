const express = require('express');
const router = express.Router();
const geocode = require('../utils/geocode');
const forecast = require('../utils/forecast');

router.get('/', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        developer: 'Mohammad Hosseini'
    })
});

router.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address.'
        });
    }

    geocode(req.query.address, (error, {location, latitude, longitude} = {}) => {
        if (error) return res.send({error});

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) return res.send({error});

            res.send({
                location,
                forecastData,
                address: req.query.address
            });
        });
    });
});

router.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        developer: 'Mohammad Hosseini',
        helpMessage: 'Enter the address where you want to forecast in the form and click on search.'
    });
});

router.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        developer: 'Mohammad Hosseini',
        githubLink: 'https://github.com/1mimhe',
        telegramLink: 'https://t.me/iMimHe',
        xLink: 'https://x.com/1mimhe'
    });
});

router.get('*', (req, res) => {
   res.render('404', {
      title: '404',
      developer: 'Mohammad Hosseini',
      errorMessage: 'Page not found.'
   });
});

module.exports = router;