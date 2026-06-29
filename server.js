require('dotenv').config();

const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());

const PORT = process.env.PORT;

app.get('/', (request, response) => {
  response.send('Hello from City Explorer API!');
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});