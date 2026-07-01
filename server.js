require('dotenv').config();

const express = require('express');
const cors = require('cors');

const getWeather = require('./modules/weather');
const getMovies = require('./modules/movies');

const app = express();

app.use(cors());

const PORT = process.env.PORT;

app.get('/', (request, response) => {
  response.send('Hello from City Explorer API!');
});

app.get('/weather', getWeather);

app.get('/movies', getMovies);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});