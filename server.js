require('dotenv').config();

const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();

app.use(cors());

const PORT = process.env.PORT;
const WEATHER_API_KEY = process.env.WEATHER_API_KEY;
const MOVIE_API_KEY = process.env.MOVIE_API_KEY;

class Forecast {

  constructor(day) {

    this.date = day.valid_date;

    this.description =
      `Low of ${day.low_temp}, high of ${day.max_temp} with ${day.weather.description}`;

  }

}

class Movie {

  constructor(movie) {

    this.title = movie.title;

    this.overview = movie.overview;

    this.average_votes = movie.vote_average;

    this.total_votes = movie.vote_count;

    this.image_url =
      `https://image.tmdb.org/t/p/w500${movie.poster_path}`;

    this.popularity = movie.popularity;

    this.released_on = movie.release_date;

  }

}

function handleError(error, response) {

  console.error(error.response?.data || error);

  response.status(500).send({
    error: 'Something went wrong.'
  });

}

app.get('/', (request, response) => {

  response.send('Hello from City Explorer API!');

});

app.get('/weather', async (request, response) => {

  try {

    const { lat, lon } = request.query;

    const weatherURL =
      `https://api.weatherbit.io/v2.0/forecast/daily?lat=${lat}&lon=${lon}&key=${WEATHER_API_KEY}`;

    const weatherResponse = await axios.get(weatherURL);

    const forecasts =
      weatherResponse.data.data.map(day => new Forecast(day));

    response.send(forecasts);

  } catch (error) {

    handleError(error, response);

  }

});

app.get('/movies', async (request, response) => {

  try {

    const { searchQuery } = request.query;

    const movieURL =
      `https://api.themoviedb.org/3/search/movie?api_key=${MOVIE_API_KEY}&query=${searchQuery}`;

    const movieResponse = await axios.get(movieURL);

    const movies =
      movieResponse.data.results.map(movie => new Movie(movie));

    response.send(movies);

  } catch (error) {

    handleError(error, response);

  }

});

app.listen(PORT, () => {

  console.log(`Listening on port ${PORT}`);

});