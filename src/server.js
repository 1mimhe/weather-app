const path = require('path');
const express = require('express');
const app = express();
const hbs = require('hbs');
require('dotenv').config();
const router = require('./routes/main');

const PORT = process.env.PORT || 3000;

const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

app.use(express.static(publicDirectoryPath));
app.use(router);

app.listen(PORT, () => console.log(`Server is up on port ${PORT}.`));