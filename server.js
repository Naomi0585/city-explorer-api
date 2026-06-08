require('dotenv').config();
const express = require('express');
const cors = require('cors');
const weather = require('./assets/weather.json');// this is speicifc to our lab for city explorer but everything line 1 - 9 is our structure for a backend express app . 

const app = express();
app.use(cors());

const PORT = process.env.PORT || 3001;

app.get('/weather', handleWeather);//Create an API endpoint of /weather that processes a GET request that contains lat, lon and searchQuery information.
app.use('*', (request, response) => response.status(404).send('page not found'));

function handleWeather(request, response) {
  let { searchQuery } = request.query;

  if (!searchQuery) {
    return response.status(400).send('Missing searchQuery parameter');
  }

  const city = weather.find(city => city.city_name.toLowerCase() === searchQuery.toLowerCase());

  if (!city) {
    return response.status(404).send('City not found');
  }

  try {
    const weatherArray = city.data.map(day => new Forecast(day));
    response.status(200).send(weatherArray);
  } catch (error) {
    errorHandler(error, response);
  }//speicifc to when the data about the forecast not being fetched 
}

function Forecast(day) {
  this.date = day.valid_date;
  this.description = day.weather.description;
}// a class for forescast, you can tell beacuse the name is capialzied 

function errorHandler(error, response) {
  console.error(error);
  response.status(500).send('Something went wrong');
}//general errohandler for the general back end server 

app.listen(PORT, () => console.log(`listening on ${PORT}`));
