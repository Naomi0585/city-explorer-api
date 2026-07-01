const axios = require('axios');

const WEATHER_API_KEY = process.env.WEATHER_API_KEY;

class Forecast {

  constructor(day) {

    this.date = day.valid_date;

    this.description =
      `Low of ${day.low_temp}, high of ${day.max_temp} with ${day.weather.description}`;

  }

}

async function getWeather(request, response) {

  try {

    const { lat, lon } = request.query;

    const weatherURL =
      `https://api.weatherbit.io/v2.0/forecast/daily?lat=${lat}&lon=${lon}&key=${WEATHER_API_KEY}`;

    const weatherResponse = await axios.get(weatherURL);

    const forecasts =
      weatherResponse.data.data.map(day => new Forecast(day));

    response.send(forecasts);

  } catch (error) {

    console.error(error.response?.data || error);

    response.status(500).send({
      error: 'Something went wrong.'
    });

  }

}

module.exports = getWeather;
