const axios = require('axios');

const MOVIE_API_KEY = process.env.MOVIE_API_KEY;

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

async function getMovies(request, response) {

  try {

    const { searchQuery } = request.query;

    const movieURL =
      `https://api.themoviedb.org/3/search/movie?api_key=${MOVIE_API_KEY}&query=${searchQuery}`;

    const movieResponse = await axios.get(movieURL);

    const movies =
      movieResponse.data.results.map(movie => new Movie(movie));

    response.send(movies);

  } catch (error) {

    console.error(error.response?.data || error);

    response.status(500).send({
      error: 'Something went wrong.'
    });

  }

}

module.exports = getMovies;
